import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { School } from 'src/school/entities/school.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the organization' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the organization' })
  name: string;

  @ManyToOne(() => School, school => school.organizations, { nullable: true })
  school: School; // Establishes a many-to-one relationship with School
}