import {Column, DataType, Table, Model} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "language",
    modelName: "Language",
    underscored: true
})
class Language extends Model{

    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;
}

export default Language;