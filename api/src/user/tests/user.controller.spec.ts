import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDriveRequest } from '../dto/requests/user.request';
import { CreatePassengerRequest } from '../dto/requests/user.request';
import { CreateVehicleRequest } from '../dto/requests/user.request';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const mockPrismaService = {
      motorista: {
        create: jest.fn().mockResolvedValue({
          nome: 'John Doe',
          descricao: 'Driver Description',
          quilometragem_minima_aceita: 100,
          custo_por_km: 10,
          descricao_avaliacao: 'Good Driver',
          nota_avaliacao: 5,
          data_nascimento: new Date('1990-01-01'),
          id_veiculo: 1,
        }),
      },
      passageiro: {
        create: jest.fn().mockResolvedValue({
          id: 'uuid',
          nome: 'Jane Doe',
          descricao: 'Passenger Description',
          data_nascimento: new Date('1990-01-01'),
        }),
      },
      veiculo: {
        create: jest.fn().mockResolvedValue({
          id: 1,
          tipo_veiculo: 'Car',
          cor_veiculo: 'Red',
          nome: 'Car Name',
          marca: 'Brand',
          ano: new Date('2020-01-01'),
          placa: 'ABC1234',
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Testando o método createDriver
  it('should create a driver and return success message', async () => {
    const createDriverDto: CreateDriveRequest = {
      nome: 'John Doe',
      descricao: 'Driver Description',
      quilometragem_minima_aceita: 100,
      custo_por_km: 10,
      descricao_avaliacao: 'Good Driver',
      nota_avaliacao: 5,
      data_nascimento: new Date('1990-01-01'),
      id_veiculo: 1,
    };

    const result = await controller.createDriver(createDriverDto);

    expect(result.message).toBe('Driver created successfully');
    expect(result.driver.nome).toBe('John Doe');
    expect(prismaService.motorista.create).toHaveBeenCalledTimes(1);
    expect(prismaService.motorista.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        nome: 'John Doe',
        descricao: 'Driver Description',
        quilometragem_minima_aceita: 100,
        custo_por_km: 10,
        descricao_avaliacao: 'Good Driver',
        nota_avaliacao: 5,
        data_nascimento: new Date('1990-01-01'),
        id_veiculo: 1,
      }),
    });
  });

  // Testando o método createPassenger
  it('should create a passenger and return success message', async () => {
    const createPassengerDto: CreatePassengerRequest = {
      nome: 'Jane Doe',
      descricao: 'Passenger Description',
      data_nascimento: new Date('1990-01-01'),
    };

    const result = await controller.createPassenger(createPassengerDto);

    expect(result.message).toBe('Passenger created successfully');
    expect(result.passenger.nome).toBe('Jane Doe');
    expect(prismaService.passageiro.create).toHaveBeenCalledTimes(1);
    expect(prismaService.passageiro.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        nome: 'Jane Doe',
        descricao: 'Passenger Description',
        data_nascimento: new Date('1990-01-01'),
      }),
    });
  });

  // Testando o método createVehicle
  it('should create a vehicle and return success message', async () => {
    const createVehicleDto: CreateVehicleRequest = {
      tipo_veiculo: 'Car',
      cor_veiculo: 'Red',
      nome: 'Car Name',
      estado_atual_veiculo:'novo',
      marca: 'Brand',
      ano: new Date('2020-01-01'),
      placa: 'ABC1234',
    };

    const result = await controller.createVehicle(createVehicleDto);

    expect(result.message).toBe('Vehicle created successfully');
    expect(result.vehicle.nome).toBe('Car Name');
    expect(prismaService.veiculo.create).toHaveBeenCalledTimes(1);
    expect(prismaService.veiculo.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        tipo_veiculo: 'Car',
        cor_veiculo: 'Red',
        nome: 'Car Name',
        marca: 'Brand',
        ano: new Date('2020-01-01'),
        placa: 'ABC1234',
      }),
    });
  });
});
