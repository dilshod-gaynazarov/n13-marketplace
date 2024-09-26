import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttributes {
  role: string;
  username: string;
  hashed_password: string;
  email: string;
}

@Table({ tableName: 'admin' })
export class AdminModel extends Model<AdminModel, AdminAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM('superadmin', 'admin'),
    defaultValue: 'admin',
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;
}
