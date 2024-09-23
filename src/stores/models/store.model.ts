import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
