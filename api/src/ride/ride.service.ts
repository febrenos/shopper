import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EstimateRequest } from './request/create-estimate';
import { EstimateResponse, LatLong } from './response/create-estimate';
import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import { ConfirmTravelRequest } from './request/confirm-travel';
import { ConfirmTravelResponse } from './response/confirm-travel';
import {
  CustomerNotFoundException,
  DriverNotFoundException,
} from '../common/exceptions/exception';
import { ExceptionHandler } from '../common/exceptions/exception-handler';
import { Rides, TravelsDone } from './response/travel-history';

@Injectable()
export class RideService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly googleClient = new Client({});

  async calculateTravel(
    estimateRequest: EstimateRequest,
  ): Promise<EstimateResponse> {
    const { customer_id, origin, destination } = estimateRequest;
  
    try {
      if (!destination || !origin || destination === origin) {
        ExceptionHandler.invalidData();
      }
  
      if (!customer_id) {
        ExceptionHandler.invalidData(
          'O id do usuário não pode estar em branco.',
        );
      }
  
      // const customer = await this.prismaService.passageiro.findUnique({
      //   where: { id: customer_id },
      // });
  
      // Faz a chamada para a API Directions
      const googleResponse = await this.googleClient.directions({
        params: {
          origin,
          destination,
          mode: TravelMode.driving,
          key: process.env.GOOGLE_API_KEY,
        },
      });
  
      // Busca todos os motoristas
      const motoristas = await this.prismaService.motorista.findMany({
        orderBy: {
          custo_por_km: 'asc',
        },
        include: {
          Veiculo: true,
        },
      });
  
      // Extraindo os dados do retorno da API
      const route = googleResponse.data.routes[0];
      const leg = route.legs[0];
  
      const distanceInKm = leg.distance.value / 1000; // Converter para quilômetros
      const durationInMinutes = leg.duration.text; // Duração como string legível
      const originCoordinates: LatLong = {
        latitude: leg.start_location.lat,
        longitude: leg.start_location.lng,
      };
      const destinationCoordinates: LatLong = {
        latitude: leg.end_location.lat,
        longitude: leg.end_location.lng,
      };
  
      // Construindo as opções com base nos motoristas encontrados
      const options = motoristas.map((motorista) => {
        const vehicleInfo = motorista.Veiculo
          ? `${motorista.Veiculo.tipo_veiculo} ${motorista.Veiculo.nome} ${motorista.Veiculo.ano.getFullYear()} ${motorista.Veiculo.cor_veiculo}`
          : 'Informações do veículo indisponíveis';
  
        return {
          id: motorista.id,
          name: motorista.nome || 'Sem Nome',
          description: motorista.descricao || 'Sem Descrição',
          vehicle: vehicleInfo, // Concatenando as informações do veículo
          review: {
            rating: motorista.nota_avaliacao || 0.0,
            comment: motorista.descricao_avaliacao || 'Sem Avaliação',
          },
          value: Math.round(motorista.custo_por_km * distanceInKm * 100) / 100, //parseFloat((motorista.custo_por_km * distanceInKm).toFixed(2))
        };
      });
  
      // Montar a resposta final
      const estimateResponse: EstimateResponse = {
        origin: originCoordinates,
        destination: destinationCoordinates,
        distance: distanceInKm,
        duration: durationInMinutes,
        options: options, // Retorna todas as opções de motoristas
        routeResponse: googleResponse.data,
      };
  
      return estimateResponse;
    } catch (error) {
      throw error;
    }
  }  

  async confirmTravel(
    confirmTravelRequest: ConfirmTravelRequest,
  ): Promise<ConfirmTravelResponse> {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver: { id: id_motorista, name: nome_motorista },
      value,
    } = confirmTravelRequest;

    if ((!destination || !origin) || (destination === origin)) {
      ExceptionHandler.invalidData();
    }

    if (!customer_id) {
      ExceptionHandler.invalidData('O id do usuário não pode estar em branco.');
    }

    const mostorista = await this.prismaService.motorista.findUnique({
      where: { id: id_motorista },
    });

    if (!mostorista) {
      throw new DriverNotFoundException(
        `Motorista com ID ${id_motorista} não encontrado`,
      );
    }

    if (mostorista.quilometragem_minima_aceita > distance) {
      ExceptionHandler.invalidDriverDistance();
    }

    // const googleResponse = await this.googleClient.directions({
    //   params: {
    //     origin,
    //     destination,
    //     mode: TravelMode.driving,
    //     key: process.env.GOOGLE_API_KEY,
    //   },
    // });

    await this.prismaService.historicoViagens.create({
      data: {
        id_motorista: id_motorista,
        id_passageiro: customer_id,
        nome_motorista: nome_motorista,
        origem: origin,
        distancia: distance,
        destino: destination,
        data_inicio: new Date(),
        valor: value,
        duracao: duration,
        rota_google_api: null, //JSON.parse(JSON.stringify(googleResponse.data))
      },
    });

    return {
      success: true,
    };
  }

  async getTravelsDone(
    customerId: string,
    driverId: number,
  ): Promise<TravelsDone> {

    if (!customerId) {
      ExceptionHandler.invalidData('O id do usuário não pode estar em branco.');
    }

    const motorista = await this.prismaService.motorista.findUnique({
      where: { id: driverId },
    });

    if (!motorista || !driverId) {
      ExceptionHandler.invalidDriver();
    }

    const travelsDone = await this.prismaService.historicoViagens.findMany({
      where: {
        id_passageiro: customerId,
        id_motorista: driverId,
      },
      orderBy: {
        data_inicio: 'desc', //da mais recente
      },
      select: {
        id: true,
        id_motorista: true,
        id_passageiro: true,
        nome_motorista: true,
        duracao: true,
        distancia: true,
        origem: true,
        destino: true,
        data_inicio: true,
        valor: true,
        // status_viagem: true,
        // rota_google_api: true,
      },
    });

    if (!Array.isArray(travelsDone) || travelsDone.length === 0) {
      ExceptionHandler.noRidesFound();
    }

    const rides = travelsDone.map((travel) => ({
      id: travel.id,
      date: travel.data_inicio,
      origin: travel.origem,
      destination: travel.destino,
      distance: travel.distancia || 0,
      duration: travel.duracao || '',
      driver: {
        id: travel.id_motorista,
        name: travel.nome_motorista || '',
      },
      value: travel.valor || 0,
    }));

    return {
      customer_id: customerId,
      rides: rides,
    };
  }
}
