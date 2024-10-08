import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CategoryModel } from 'src/categories/models/category.model';

interface StoreAttributes {
  name: string;
  image: string;
  phone: string;
  location: string;
}

@Table({ tableName: 'stores' })
export class StoreModel extends Model<StoreModel, StoreAttributes> {
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
  name: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @HasMany(() => CategoryModel)
  categories: CategoryModel[];
}
