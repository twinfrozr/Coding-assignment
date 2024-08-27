import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolModule } from './school/school.module';
import { AddressModule } from './address/address.module';
import { OrganizationModule } from './organization/organization.module';
import { School } from './school/entities/school.entity';
import { Address } from './address/entities/address.entity';
import { Organization } from './organization/entities/organization.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',  // Database type
    host: 'localhost', // Your database host
    port: 5432,        // Your database port (default for PostgreSQL)
    username: 'postgres', // Your database username
    password: 'admin', // Your database password
    database: 'test',     // Your database name
    entities: [School, Address, Organization],
    synchronize: true, // Auto-create the database schema based on entities (for development use)
  }), SchoolModule, AddressModule, OrganizationModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
