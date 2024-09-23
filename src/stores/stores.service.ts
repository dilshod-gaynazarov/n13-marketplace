import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StoreModel } from './models/store.model';

@Injectable()
export class StoresService {
  constructor(@InjectModel(StoreModel) private storeModel: typeof StoreModel) { }

  async create(createStoreDto: CreateStoreDto): Promise<object> {
    try {
      const exist_phone = await this.storeModel.findOne({ where: { phone: createStoreDto.phone } });
      if (exist_phone) {
        throw new ConflictException('phone number already exist');
      }
      const new_store = await this.storeModel.create(createStoreDto);
      return {
        message: 'New store added success',
        data: new_store
      }
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }

  async findAll(): Promise<StoreModel[]> {
    try {
      const stores = await this.storeModel.findAll();
      return stores;
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }

  async findOne(id: number): Promise<StoreModel> {
    try {
      const store = await this.storeModel.findByPk(id);
      if (!store) {
        throw new NotFoundException('store not found');
      }
      return store;
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    try {
      await this.findOne(id);
      const store = await this.storeModel.update(updateStoreDto, { where: { id }, returning: true });
      return {
        message: 'Store updated success',
        data: store[1][0]
      };
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const store = await this.findOne(id);
      store.destroy();
      return {
        message: "Store deleted success"
      };
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }
}
