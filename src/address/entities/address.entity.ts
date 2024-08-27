import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { School } from 'src/school/entities/school.entity';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    town: string;
  
    @Column()
    tehsil: string;
  
    @Column()
    district: string;
  
    @Column()
    state: string;
  
    @Column()
    address: string;
  
    @Column('decimal', { precision: 9, scale: 6 })
    latitude: number;
  
    @Column('decimal', { precision: 9, scale: 6 })
    longitude: number;
  
    @ManyToOne(() => School, school => school.addresses, { nullable: true })
    school: School;
}