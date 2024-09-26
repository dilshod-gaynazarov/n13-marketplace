import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel) private productModel: typeof ProductModel,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const new_product = await this.productModel.create(createProductDto);
      return {
        message: 'success',
        data: new_product,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.findAll({
        include: { all: true },
      });
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productModel.findOne({
        where: { id },
        include: { all: true },
      });
      if (!product) {
        throw new NotFoundException('product not found');
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.findOne(id);
      const product = await this.productModel.update(updateProductDto, {
        where: { id },
        returning: true,
      });
      return {
        message: 'success',
        data: product,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const product = await this.findOne(id);
      product.destroy();
      return {
        message: 'success',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
