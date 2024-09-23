import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModel } from './models/store.model';

@Module({
  imports: [SequelizeModule.forFeature([StoreModel])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
