import {BelongsTo, Column, DataType, ForeignKey, Table, Model, Validate} from "sequelize-typescript";
import Language from "./Language";
import Metadata from "./Metadata";
import {CreationOptional} from "sequelize";
import User from "./User";

@Table({
    timestamps: true,
    tableName: "word",
    modelName: "Word",
    underscored: true,
    defaultScope: {
        attributes: {
            exclude: ['languageId', 'userId']
        },
        include: [
            {model: Language, as: 'language'}
        ]
    }
})
class Word extends Model{

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
    declare word: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @ForeignKey(() => Language)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare languageId: number;

    @BelongsTo(() => Language)
    declare language: Language;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default Word;