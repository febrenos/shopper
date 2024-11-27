import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsObject,
  IsArray,
  ValidateNested,
  IsOptional,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Driver {
  id: number;
  name: string;
}

export class ConfirmTravelRequest {
  @ApiProperty({
    example: 'a88b4431-c676-4409-86c8-e1331a38546d',
  })
  customer_id: string;

  @ApiProperty({
    example: '37.7749145,-122.4193077',
  })
  @Matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, {
    message: 'O campo destination deve estar no formato latitude,longitude.',
  })
  origin: string;

  @ApiProperty({
    example: '34.0523422,-118.243569',
  })
  @Matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, {
    message: 'O campo destination deve estar no formato latitude,longitude.',
  })
  destination: string;

  @ApiProperty({
    example: 616.59,
  })
  distance: number;

  @ApiProperty({
    example: '5 hours 50 mins',
  })
  duration: string;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Homer Simpson',
    },
  })
  driver: Driver;

  @ApiProperty({
    example: 1541.48,
  })
  value: number;
}
