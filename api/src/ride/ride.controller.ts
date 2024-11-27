import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RideService } from './ride.service';
import { EstimateRequest } from './request/create-estimate';
import { EstimateResponse } from './response/create-estimate';
import { ConfirmTravelRequest } from './request/confirm-travel';
import { ConfirmTravelResponse } from './response/confirm-travel';
import { Rides, TravelsDone } from './response/travel-history';

@ApiTags('Ride')
@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  async calculateTravel(
    @Body() estimateRequest: EstimateRequest,
  ): Promise<EstimateResponse> {
    return await this.rideService.calculateTravel(estimateRequest);
  }

  @Patch('confirm')
  async confirmTravel(
    @Body() confirmTravelRequest: ConfirmTravelRequest,
  ): Promise<ConfirmTravelResponse> {
    return await this.rideService.confirmTravel(confirmTravelRequest);
  }

  @Get(':customer_id')
  async getTravelsDone(
    @Param('customer_id') customerId: string,
    @Query('driver_id', ParseIntPipe) driverId: number,
  ): Promise<TravelsDone> {
    return await this.rideService.getTravelsDone(customerId, driverId);
  }
}
