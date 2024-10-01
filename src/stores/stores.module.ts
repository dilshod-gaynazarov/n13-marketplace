import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModel } from './models/store.model';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([StoreModel]), FileModule],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
