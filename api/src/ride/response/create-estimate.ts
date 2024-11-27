import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsObject,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Review {
  @ApiProperty({ description: 'Rating given by the user', example: 4.5 })
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'Comment about the service',
    example: 'Great ride!',
  })
  @IsString()
  comment: string;
}

export class LatLong {
  @ApiProperty({ description: 'Latitude coordinate', example: -23.55052 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude coordinate', example: -46.633308 })
  @IsNumber()
  longitude: number;
}

export class Options {
  @ApiProperty({ description: 'Option ID', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Option name', example: 'Economy' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Option description',
    example: 'Affordable rides for everyday use',
  })
  description: string;

  @ApiProperty({ description: 'Vehicle type', example: 'Car' })
  @IsString()
  vehicle: string;

  @ApiProperty({ description: 'Review for the option', type: Review })
  @IsObject()
  @ValidateNested()
  @Type(() => Review)
  review: Review;

  @ApiProperty({ description: 'Price of the option', example: 15.0 })
  @IsString()
  value: number;
}

export class EstimateResponse {
  @ApiProperty({ description: 'Origin coordinates', type: LatLong })
  @ValidateNested()
  @Type(() => LatLong)
  origin: LatLong;

  @ApiProperty({ description: 'Destination coordinates', type: LatLong })
  @ValidateNested()
  @Type(() => LatLong)
  destination: LatLong;

  @ApiProperty({
    description: 'Distance between origin and destination in kilometers',
    example: 10.5,
  })
  @IsNumber()
  distance: number;

  @ApiProperty({
    description: 'Estimated duration of the trip',
    example: '15 minutes',
  })
  @IsString()
  duration: string;

  @ApiProperty({ description: 'Available options for the trip', type: Options })
  @ValidateNested()
  @Type(() => Options)
  options: Options[];

  @ApiProperty({
    description: 'Raw response of the route calculation',
    example: {},
  })
  @IsObject()
  routeResponse: any;
}
