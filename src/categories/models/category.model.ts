import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { StoreModel } from "src/stores/models/store.model";

interface CategoryAttributes {
    type: string;
    image: string;
}

@Table({ tableName: 'categories' })
export class CategoryModel extends Model<CategoryModel, CategoryAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    type: string;

    @Column({
        type: DataType.STRING
    })
    image: string;

    @ForeignKey(() => StoreModel)
    @Column({
        type: DataType.INTEGER
    })
    store_id: number;

    @BelongsTo(() => StoreModel)
    store: StoreModel;
}