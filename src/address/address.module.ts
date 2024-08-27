import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/school/entities/school.entity';
import { Address } from './entities/address.entity';
import { Organization } from 'src/organization/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([School, Address, Organization]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
