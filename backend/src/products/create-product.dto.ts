import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'High performance laptop' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 1200 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
