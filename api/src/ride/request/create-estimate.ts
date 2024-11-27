import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class EstimateRequest {
  @ApiProperty({
    example: 'a88b4431-c676-4409-86c8-e1331a38546d',
    description: 'ID do cliente',
  })
  @IsString({ message: 'O campo customer_id deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo customer_id não pode estar vazio.' })
  customer_id: string;

  @ApiProperty({
    example: '37.7749145,-122.4193077',
    description: 'Coordenadas de origem no formato latitude,longitude',
  })
  @IsString({ message: 'O campo origin deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo origin não pode estar vazio.' })
  @Matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, {
    message: 'O campo origin deve estar no formato latitude,longitude.',
  })
  origin: string;

  @ApiProperty({
    example: '34.0523422,-118.243569',
    description: 'Coordenadas de destino no formato latitude,longitude',
  })
  @IsString({ message: 'O campo destination deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo destination não pode estar vazio.' })
  @Matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, {
    message: 'O campo destination deve estar no formato latitude,longitude.',
  })
  destination: string;
}
