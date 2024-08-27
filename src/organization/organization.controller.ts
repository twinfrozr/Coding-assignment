import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationResponseDto } from './dto/organization-response.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({ status: 201, description: 'The organization has been successfully created.', type: OrganizationResponseDto })
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<OrganizationResponseDto> {
    const organization = await this.organizationService.create(createOrganizationDto);
    return organization; // Convert to DTO if necessary
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'List of organizations', type: [OrganizationResponseDto] })
  async findAll(): Promise<OrganizationResponseDto[]> {
    const organizations = await this.organizationService.findAll();
    return organizations; // Convert to DTOs if necessary
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an organization by ID' })
  @ApiResponse({ status: 200, description: 'The organization details', type: OrganizationResponseDto })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async findOne(@Param('id') id: number): Promise<OrganizationResponseDto> {
    try {
      const organization = await this.organizationService.findOne(id);
      return organization; // Convert to DTO if necessary
    } catch (error) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organization by ID' })
  @ApiResponse({ status: 200, description: 'The updated organization details', type: OrganizationResponseDto })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async update(@Param('id') id: number, @Body() updateOrganizationDto: UpdateOrganizationDto): Promise<OrganizationResponseDto> {
    try {
      const organization = await this.organizationService.update(id, updateOrganizationDto);
      return organization; // Convert to DTO if necessary
    } catch (error) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization by ID' })
  @ApiResponse({ status: 204, description: 'The organization has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.organizationService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
  }
}
