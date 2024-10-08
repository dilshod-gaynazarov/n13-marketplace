import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StoreModel } from './models/store.model';
import { CategoryModel } from 'src/categories/models/category.model';
import { FileService } from 'src/file/file.service';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(StoreModel) private storeModel: typeof StoreModel,
    private readonly fileService: FileService
  ) { }

  async create(createStoreDto: CreateStoreDto, file: Express.Multer.File): Promise<object> {
    try {
      const image = await this.fileService.uploadFile(file);
      const exist_phone = await this.storeModel.findOne({
        where: { phone: createStoreDto.phone },
      });
      if (exist_phone) {
        throw new ConflictException('phone number already exist');
      }
      const new_store = await this.storeModel.create({ ...createStoreDto, image });
      return {
        message: 'New store added success',
        data: new_store,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<StoreModel[]> {
    try {
      const stores = await this.storeModel.findAll({
        include: { model: CategoryModel },
        order: [
          ['createdAt', 'DESC']
        ]
      });
      return stores;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<StoreModel> {
    try {
      const store = await this.storeModel.findByPk(id, {
        include: { model: CategoryModel },
      });
      if (!store) {
        throw new NotFoundException('store not found');
      }
      return store;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    try {
      await this.findOne(id);
      const store = await this.storeModel.update(updateStoreDto, {
        where: { id },
        returning: true,
      });
      return {
        message: 'Store updated success',
        data: store[1][0],
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const store = await this.findOne(id);
      await this.fileService.deleteFile(store.image);
      store.destroy();
      return {
        message: 'Store deleted success',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
