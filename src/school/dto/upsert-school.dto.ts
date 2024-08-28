import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpsertSchoolDto {
    @ApiProperty({ description: 'Name of the school' })
    @IsString()
    name: string;
  
    @ApiPropertyOptional({ description: 'Status of the school' })
    @IsOptional()
    @IsString()
    status?: string;
  
    @ApiPropertyOptional({ description: 'Start time of the school' })
    @IsOptional()
    @IsString()
    startTime?: string;
  
    @ApiPropertyOptional({ description: 'End time of the school' })
    @IsOptional()
    @IsString()
    endTime?: string;
  
    @ApiPropertyOptional({ description: 'Shift of the school (Morning/Evening)' })
    @IsOptional()
    @IsString()
    shift?: string;
  
    @ApiPropertyOptional({ description: 'Does the school have a projector?' })
    @IsOptional()
    @IsBoolean()
    hasProjector?: boolean;
  
    @ApiPropertyOptional({ description: 'Does the school have a laptop?' })
    @IsOptional()
    @IsBoolean()
    hasLaptop?: boolean;
  
    @ApiPropertyOptional({ type: [CreateAddressDto], description: 'List of addresses associated with the school' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    addresses?: CreateAddressDto[];
}