import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from 'src/school/entities/school.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const { schoolId, ...organizationData } = createOrganizationDto;
    const organization = this.organizationRepository.create(organizationData);

    if (schoolId) {
      const school = await this.schoolRepository.findOneBy({ id: schoolId });
      if (school) {
        organization.school = school;
      }
    }

    return await this.organizationRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find({ relations: ['school'] });
  }

  async findOne(id: number): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['school'],
    });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    const { schoolId, ...updateData } = updateOrganizationDto;
    const organization = await this.organizationRepository.preload({
      id,
      ...updateData,
    });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    if (schoolId) {
      const school = await this.schoolRepository.findOneBy({ id: schoolId });
      if (school) {
        organization.school = school;
      }
    }

    return await this.organizationRepository.save(organization);
  }

  async remove(id: number): Promise<void> {
    const result = await this.organizationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
  }
}
