import { Test, TestingModule } from '@nestjs/testing';
import { RideService } from '../../ride.service';
import { PrismaService } from '../../../prisma/prisma.service'; 

jest.mock('../../../prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    passageiro: {
      findUnique: jest.fn(),
    },
    motorista: {
      findMany: jest.fn(),
    },
    historicoViagens: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  })),
}));

describe('RideService', () => {
  let service: RideService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RideService, PrismaService], // Adiciona o PrismaService no módulo de teste
    }).compile();

    service = module.get<RideService>(RideService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Outros testes podem ser adicionados aqui...
});
