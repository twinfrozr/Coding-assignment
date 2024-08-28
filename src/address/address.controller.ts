import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressResponseDto } from './dto/address-response.dto';

@ApiTags("Address")
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create address' })
  @ApiResponse({ status: 201, description: 'The address has been successfully created.', type: AddressResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createAddressDto: CreateAddressDto): Promise<AddressResponseDto> {
    const address = await this.addressService.create(createAddressDto);
    return address;
  }

  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({ status: 200, description: 'List of all addresses', type: [AddressResponseDto] })
  async findAll(): Promise<AddressResponseDto[]> {
    return await this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get address by ID' })
  @ApiResponse({ status: 200, description: 'Address details', type: AddressResponseDto })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async findOne(@Param('id') id: number): Promise<AddressResponseDto> {
    return await this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update address by ID' })
  @ApiResponse({ status: 200, description: 'The address has been successfully updated.', type: AddressResponseDto })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto): Promise<AddressResponseDto> {
    return await this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete address by ID' })
  @ApiResponse({ status: 204, description: 'The address has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.addressService.remove(id);
  }
}
