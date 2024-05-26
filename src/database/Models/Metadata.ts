import {BelongsTo, Column, DataType, ForeignKey, Table, Model} from "sequelize-typescript";
import Language from "./Language";
@Table({
    timestamps: false,
    tableName: "metadata",
    modelName: "Metadata",
    underscored: true
})
class Metadata extends Model{

    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
    })
    declare id: number;

    @ForeignKey(() => Language)
    @Column({
        type: DataType.INTEGER,
    })
    declare languageId: number;

    @BelongsTo(() => Language)
    declare language: Language;
}

export default Metadata;