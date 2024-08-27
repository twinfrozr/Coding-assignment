import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ description: 'Name of the organization' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'School ID to associate with this organization', required: false })
  @IsOptional()
  @IsInt()
  schoolId?: number; // Optional field to link to School
}