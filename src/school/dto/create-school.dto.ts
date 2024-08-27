import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSchoolDto {
  @ApiProperty({ description: 'The name of the school' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The status of the school' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'The start time of the school' })
  @IsNotEmpty()
  
  startTime: string;

  @ApiProperty({ description: 'The end time of the school' })
  @IsNotEmpty()
  
  endTime: string;

  @ApiProperty({ description: 'The shift of the school' })
  @IsNotEmpty()
  @IsString()
  shift: string;

  @ApiProperty({ description: 'Whether the school has a projector' })
  @IsOptional()
  @IsBoolean()
  hasProjector?: boolean;

  @ApiProperty({ description: 'Whether the school has a laptop' })
  @IsOptional()
  @IsBoolean()
  hasLaptop?: boolean;

  
}