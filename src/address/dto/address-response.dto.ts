import { ApiProperty } from '@nestjs/swagger';
import { School } from 'src/school/entities/school.entity';

export class AddressResponseDto {
    @ApiProperty({ description: 'ID of the address' })
    id: number;
  
    @ApiProperty({ description: 'Town' })
    town: string;
  
    @ApiProperty({ description: 'Tehsil' })
    tehsil: string;
  
    @ApiProperty({ description: 'District' })
    district: string;
  
    @ApiProperty({ description: 'State' })
    state: string;
  
    @ApiProperty({ description: 'Address' })
    address: string;
  
    @ApiProperty({ description: 'Latitude' })
    latitude: number;
  
    @ApiProperty({ description: 'Longitude' })
    longitude: number;
  
    @ApiProperty({ description: 'School ID', required: false })
    schoolId?: number; // Make it optional if not always present
}