import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateDriveRequest {
  @ApiProperty({
    example: 1,
  })
  id_veiculo: number;

  @ApiProperty({
    example: 'nome',
  })
  nome: string;

  @ApiProperty({
    example: 'descricao',
  })
  descricao: string;

  @ApiProperty({
    example: 4,
  })
  quilometragem_minima_aceita: number;

  @ApiProperty({
    example: 4.0,
  })
  custo_por_km: number;

  @ApiProperty({
    example: 'descricao_avaliacao',
  })
  descricao_avaliacao: string;

  @ApiProperty({
    example: 4.5,
  })
  nota_avaliacao: number;

  @ApiProperty({
    example: '1990-10-29T00:00:00.000Z',
  })
  data_nascimento: Date;
}

export class CreatePassengerRequest {
  @ApiProperty({
    example: 'nome',
  })
  nome: string;

  @ApiProperty({
    example: 'descricao',
  })
  descricao: string;

  @ApiProperty({
    example: '1990-10-29T00:00:00.000Z',
  })
  data_nascimento: Date;
}

export class CreateVehicleRequest {
  @ApiProperty({
    example: 'carro',
  })
  tipo_veiculo: string;

  @ApiProperty({
    example: 'preto',
  })
  cor_veiculo: string;

  @ApiProperty({
    example: 'Porsche 911 GT3',
  })
  nome: string;

  @ApiProperty({
    example: 'Porsche',
  })
  marca: string;

  @ApiProperty({
    example: '2023-10-29T00:00:00.000Z',
  })
  ano: Date;

  @ApiProperty({
    example: 'ja89j29',
  })
  placa: string;

  @ApiProperty({
    example: 'novo',
  })
  estado_atual_veiculo: string;
}

export class StringBuscaRequest {
  @ApiProperty({
    description: 'Busca por nome do motorista (opcional)',
    required: false,  // Marca como não obrigatório
    type: String,
  })
  @IsOptional()
  @IsString()
  string_busca?: string;  // Parâmetro de consulta opcional
}