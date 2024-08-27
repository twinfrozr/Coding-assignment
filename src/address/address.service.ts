import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { School } from 'src/school/entities/school.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { schoolId, ...addressData } = createAddressDto;
    const address = this.addressRepository.create(addressData);

    if (schoolId) {
      const school = await this.schoolRepository.findOneBy({ id: schoolId });
      if (school) {
        address.school = school;
      }
    }

    return await this.addressRepository.save(address);
  }
  
  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find({ relations: ['school'] });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['school'],
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.addressRepository.preload({
      id,
      ...updateAddressDto,
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const result = await this.addressRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
  }
}
