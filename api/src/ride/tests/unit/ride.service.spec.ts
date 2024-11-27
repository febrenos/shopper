import { Test, TestingModule } from '@nestjs/testing';
import { RideService } from '../../ride.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { EstimateRequest } from '../../../ride/request/create-estimate';
import { EstimateResponse } from '../../../ride/response/create-estimate';

class PrismaServiceMock {
  motorista = {
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        nome: 'Motorista 1',
        custo_por_km: 10,
        Veiculo: { modelo: 'Carro 1' },
      },
      {
        id: 2,
        nome: 'Motorista 2',
        custo_por_km: 15,
        Veiculo: { modelo: 'Carro 2' },
      },
    ]),
  };
  passageiro = {
    findUnique: jest.fn(),
  };
}

describe('RideService', () => {
  let service: RideService;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RideService,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile();

    service = module.get<RideService>(RideService);
    prismaService = module.get<PrismaServiceMock>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate travel and return estimate response', async () => {
    const estimateRequest: EstimateRequest = {
      customer_id: 'a88b4431-c676-4409-86c8-e1331a38546d',
      origin: '37.7749145,-122.4193077',
      destination: '34.0523422,-118.243569',
    };

    const estimateResponse: EstimateResponse =
      await service.calculateTravel(estimateRequest);

    expect(estimateResponse).toBeDefined();
    expect(estimateResponse.distance).toBeGreaterThan(0);
    expect(estimateResponse.duration).toBeDefined();

    expect(prismaService.motorista.findMany).toHaveBeenCalled();
    expect(prismaService.motorista.findMany).toHaveBeenCalledWith({
      orderBy: { custo_por_km: 'asc' },
      include: { Veiculo: true },
    });
    expect(estimateResponse.origin.latitude).toBeCloseTo(37.7749145, 6);
    expect(estimateResponse.origin.longitude).toBeCloseTo(-122.4193077, 6);
    expect(estimateResponse.destination.latitude).toBeCloseTo(34.0523422, 6);
    expect(estimateResponse.destination.longitude).toBeCloseTo(-118.243569, 6);
    expect(estimateResponse.options).toBeInstanceOf(Array);
    expect(estimateResponse.options.length).toBeGreaterThan(0);
    expect(estimateResponse.routeResponse).toBeInstanceOf(Object);
  });
});
