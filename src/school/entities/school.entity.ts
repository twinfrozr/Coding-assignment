import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Organization } from 'src/organization/entities/organization.entity';
@Entity()
export class School {
    @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the school' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the school' })
  name: string;

  @Column()
  @ApiProperty({ description: 'The status of the school' })
  status: string;

  @Column()
  @ApiProperty({ description: 'The start time of the school' })
  startTime: string;

  @Column()
  @ApiProperty({ description: 'The end time of the school' })
  endTime: string;

  @Column()
  @ApiProperty({ description: 'The shift of the school' })
  shift: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Whether the school has a projector' })
  hasProjector: boolean;

  @Column({ default: false })
  @ApiProperty({ description: 'Whether the school has a laptop' })
  hasLaptop: boolean;

  @ManyToMany(() => Address)
  @JoinTable()
  @ApiProperty({ type: () => [Address] })
  addresses: Address[];

  @ManyToMany(() => Organization)
  @JoinTable()
  @ApiProperty({ type: () => [Organization] })
  organizations: Organization[];
}