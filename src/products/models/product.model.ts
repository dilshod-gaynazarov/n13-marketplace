import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CategoryModel } from 'src/categories/models/category.model';

interface ProductAttributes {
  title: string;
  sub_title: string;
  price: number;
  description: string;
}

@Table({ tableName: 'products' })
export class ProductModel extends Model<ProductModel, ProductAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sub_title: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;
}
