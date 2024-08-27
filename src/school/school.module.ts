import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { School } from './entities/school.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([School, Address, Organization]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
