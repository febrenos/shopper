import { Injectable } from '@nestjs/common';
import {
  CreateDriveRequest,
  CreatePassengerRequest,
  CreateVehicleRequest,
  StringBuscaRequest,
} from './dto/requests/user.request';
import { PrismaService } from '../prisma/prisma.service';
import { ExceptionHandler } from '../common/exceptions/exception-handler';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDriver(createDriveRequest: CreateDriveRequest): Promise<any> {
    const {
      nome,
      descricao,
      quilometragem_minima_aceita,
      custo_por_km,
      descricao_avaliacao,
      nota_avaliacao,
      data_nascimento,
    } = createDriveRequest;

    // Criação do motorista no banco de dados
    const driver = await this.prismaService.motorista.create({
      data: {
        nome: createDriveRequest.nome,
        descricao: createDriveRequest.descricao,
        quilometragem_minima_aceita:
          createDriveRequest.quilometragem_minima_aceita,
        custo_por_km: createDriveRequest.custo_por_km,
        descricao_avaliacao: createDriveRequest.descricao_avaliacao,
        nota_avaliacao: createDriveRequest.nota_avaliacao,
        data_nascimento: createDriveRequest.data_nascimento
          ? new Date(createDriveRequest.data_nascimento)
          : null,
        id_veiculo: createDriveRequest.id_veiculo,
      },
    });
    if (
      !nome ||
      !descricao ||
      !quilometragem_minima_aceita ||
      !custo_por_km ||
      !descricao_avaliacao ||
      !nota_avaliacao ||
      !data_nascimento
    ) {
      ExceptionHandler.invalidData('Dados nao podem ser vizios');
    }

    return {
      message: 'Driver created successfully',
      driver,
    };
  }

  async createPassenger(
    createPassengerRequest: CreatePassengerRequest,
  ): Promise<any> {
    const passenger = await this.prismaService.passageiro.create({
      data: {
        nome: createPassengerRequest.nome,
        descricao: createPassengerRequest.descricao,
        data_nascimento: createPassengerRequest.data_nascimento
          ? new Date(createPassengerRequest.data_nascimento)
          : null,
      },
    });

    return {
      message: 'Passenger created successfully',
      passenger,
    };
  }

  async createVehicle(
    createVehicleRequest: CreateVehicleRequest,
  ): Promise<any> {
    const vehicle = await this.prismaService.veiculo.create({
      data: {
        tipo_veiculo: createVehicleRequest.tipo_veiculo,
        cor_veiculo: createVehicleRequest.cor_veiculo,
        nome: createVehicleRequest.nome,
        marca: createVehicleRequest.marca,
        ano: new Date(createVehicleRequest.ano),
        placa: createVehicleRequest.placa,
      },
    });

    return {
      message: 'Vehicle created successfully',
      vehicle,
    };
  }

  async getDriver(stringBusca?: string) {
    return await this.prismaService.motorista.findMany({
      where: {
        nome: {
          contains: stringBusca,
          mode: 'insensitive',
        },
      },
    });
  }

  async getPassenger(stringBusca?: string) {
    return await this.prismaService.passageiro.findMany({
      where: {
        nome: {
          contains: stringBusca,
          mode: 'insensitive',
        },
      },
    });
  }

  async getVehicle(stringBusca?: string) {
    if (stringBusca) {
      return await this.prismaService.veiculo.findMany({
        where: {
          OR: [
            { tipo_veiculo: { contains: stringBusca, mode: 'insensitive' } },
            { cor_veiculo: { contains: stringBusca, mode: 'insensitive' } },
            { nome: { contains: stringBusca, mode: 'insensitive' } },
            { marca: { contains: stringBusca, mode: 'insensitive' } },
            { placa: { contains: stringBusca, mode: 'insensitive' } },
            {
              estado_atual_veiculo: {
                contains: stringBusca,
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    } else {
      return await this.prismaService.veiculo.findMany();
    }
  }
}
