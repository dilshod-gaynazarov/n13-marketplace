import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './models/category.model';
import { Model } from 'sequelize';
import { StoreModel } from 'src/stores/models/store.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CategoryModel) private categoryModel: typeof CategoryModel
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<object> {
    try {
      const exist_category = await this.categoryModel.findOne({ where: { type: createCategoryDto.type } });
      if (exist_category) {
        throw new ConflictException('category already exist');
      }
      const new_category = await this.categoryModel.create(createCategoryDto);
      return {
        message: 'new category added success',
        data: new_category
      };
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }

  async findAll(): Promise<CategoryModel[]> {
    try {
      const categories = await this.categoryModel.findAll({ include: { model: StoreModel } });
      return categories;
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }

  async findOne(id: number): Promise<CategoryModel> {
    try {
      const category = await this.categoryModel.findByPk(id, { include: { model: StoreModel } });
      if (!category) {
        throw new NotFoundException('category not found');
      }
      return category;
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<object> {
    try {
      await this.findOne(id);
      const category = await this.categoryModel.update(updateCategoryDto, { where: { id }, returning: true });
      return {
        message: 'category updated success',
        data: category[1][0]
      }
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const category = await this.findOne(id);
      await category.destroy();
      return {
        message: 'category deleted success'
      }
    } catch (error) {
      throw new HttpException(error.response.message, error.response.statusCode);
    }
  }
}
