import { ApiProperty } from '@nestjs/swagger';
import { School } from '../../school/entities/school.entity';

export class OrganizationResponseDto {
  @ApiProperty({ description: 'ID of the organization' })
  id: number;

  @ApiProperty({ description: 'Name of the organization' })
  name: string;

  @ApiProperty({ description: 'School ID', required: false })
  @ApiProperty({ description: 'Associated School ID', required: false })
  schoolId?: number; // Reflects the School association if needed
}