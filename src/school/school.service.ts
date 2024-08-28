import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { Address } from 'src/address/entities/address.entity';
import { UpsertSchoolDto } from './dto/upsert-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = this.schoolRepository.create(createSchoolDto);
    return await this.schoolRepository.save(school);
  }

  async findAll(): Promise<School[]> {
    return await this.schoolRepository.find();
  }

  async findOne(id: number): Promise<School> {
    const school = await this.schoolRepository.findOne({
      where: { id },
      relations: ['addresses', 'organizations'], 
    });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
    return school;
  }

  async findOneSchool(id: number): Promise<School> {
    const school = await this.schoolRepository.findOne({
      where: { id },
       
    });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
    return school;
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const school = await this.schoolRepository.preload({
      id,
      ...updateSchoolDto,
    });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
    return await this.schoolRepository.save(school);
  }

  async upsertSchool(id: string, upsertSchoolDto: UpsertSchoolDto): Promise<School> {
    const { name, addresses, ...schoolData } = upsertSchoolDto;


    let school = await this.schoolRepository.findOne({
      where: { name },
      relations: ['addresses'],
    });

    if (school) {
      // Update the existing school
      school = this.schoolRepository.merge(school, schoolData);
    } else {
      // Create a new school
      school = this.schoolRepository.create(schoolData);
      school.name = name;
    }

    // Update or create addresses
    if (addresses) {
      const updatedAddresses: Address[] = [];
      for (const addressDto of addresses) {
        let address = school.addresses?.find(
          (addr) => addr.address === addressDto.address,
        );

        if (address) {
      
          address = this.addressRepository.merge(address, addressDto);
        } else {
   
          address = this.addressRepository.create(addressDto);
          address.school = school; 
        }
        updatedAddresses.push(address);
      }

      
      school.addresses = await this.addressRepository.save(updatedAddresses);
    }

    
    return await this.schoolRepository.save(school);
  }

  async remove(id: number): Promise<void> {
    const result = await this.schoolRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
  }
}
