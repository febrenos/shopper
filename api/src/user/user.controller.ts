import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateDriveRequest,
  CreatePassengerRequest,
  CreateVehicleRequest,
  StringBuscaRequest,
} from './dto/requests/user.request';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-driver')
  @HttpCode(HttpStatus.CREATED)
  async createDriver(@Body() createDriver: CreateDriveRequest) {
    return this.userService.createDriver(createDriver);
  }

  @Post('create-passenger')
  @HttpCode(HttpStatus.CREATED)
  async createPassenger(@Body() createPassenger: CreatePassengerRequest) {
    return this.userService.createPassenger(createPassenger);
  }

  @Post('create-vehicle')
  @HttpCode(HttpStatus.CREATED)
  async createVehicle(@Body() createVehicle: CreateVehicleRequest) {
    return this.userService.createVehicle(createVehicle);
  }

  @Get('driver')
  @ApiQuery({
    name: 'stringBusca',
    required: false,
    description: 'nome do motorista',
    type: String,
  })
  @HttpCode(HttpStatus.CREATED)
  async getDriver(@Query('stringBusca') stringBusca?: string) {
    return await this.userService.getDriver(stringBusca); // Passa o parâmetro stringBusca para o serviço
  }

  @Get('passenger')
  @ApiQuery({
    name: 'stringBusca',
    required: false,
    description: 'nome do passageiro',
    type: String,
  })
  @HttpCode(HttpStatus.CREATED)
  async getPassenger(@Query('stringBusca') stringBusca?: string) {
    return await this.userService.getPassenger(stringBusca);
  }

  @Get('vehicle')
  @ApiQuery({
    name: 'stringBusca',
    required: false,
    description:
      'tipo_veiculo, cor_veiculo, nome, marca, placa, estado_atual_veiculo',
    type: String,
  })
  @HttpCode(HttpStatus.CREATED)
  async getVehicle(@Query('stringBusca') stringBusca?: string) {
    return await this.userService.getVehicle(stringBusca);
  }
}
