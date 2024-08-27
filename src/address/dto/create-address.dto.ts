import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({ description: 'Town' })
    @IsString()
    town: string;
  
    @ApiProperty({ description: 'Tehsil' })
    @IsString()
    tehsil: string;
  
    @ApiProperty({ description: 'District' })
    @IsString()
    district: string;
  
    @ApiProperty({ description: 'State' })
    @IsString()
    state: string;
  
    @ApiProperty({ description: 'Address' })
    @IsString()
    address: string;
  
    @ApiProperty({ description: 'Latitude' })
    @IsNumber()
    latitude: number;
  
    @ApiProperty({ description: 'Longitude' })
    @IsNumber()
    longitude: number;
  
    @ApiProperty({ description: 'School ID', required: false })
    @IsNumber()
    @IsOptional()
    schoolId?: number;
}