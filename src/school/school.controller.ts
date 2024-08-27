import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { School } from './entities/school.entity';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new school' })
  @ApiBody({ type: CreateSchoolDto })
  @ApiResponse({ status: 201, description: 'The school has been successfully created.', type: School })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createSchoolDto: CreateSchoolDto): Promise<School> {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  @ApiResponse({ status: 200, description: 'List of all schools', type: [School] })
  async findAll(): Promise<School[]> {
    return this.schoolService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a school by ID' })
  @ApiResponse({ status: 200, description: 'The school details', type: School })
  @ApiResponse({ status: 404, description: 'School not found' })
  async findOne(@Param('id') id: number): Promise<School> {
    return this.schoolService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a school by ID' })
  @ApiBody({ type: UpdateSchoolDto })
  @ApiResponse({ status: 200, description: 'The school has been successfully updated.', type: School })
  @ApiResponse({ status: 404, description: 'School not found' })
  async update(
    @Param('id') id: number,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a school by ID' })
  @ApiResponse({ status: 204, description: 'The school has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'School not found' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.schoolService.remove(id);
  }
}
