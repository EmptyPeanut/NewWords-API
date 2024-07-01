import {BelongsTo, Column, DataType, ForeignKey, Table, Model, Validate, BelongsToMany} from "sequelize-typescript";
import Language from "./Language";
import Metadata from "./Metadata";
import {CreationOptional, NonAttribute} from "sequelize";
import User from "./User";
import UserWord from "./UserWord";
import Word from "./Word";

@Table({
    timestamps: false,
    tableName: "definition",
    modelName: "Definition",
    underscored: true
})
class Definition extends Model{

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
    declare example: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare partOfSpeech: string;

    @Column({
        type: DataType.JSON,
        allowNull: true
    })
    declare synonyms: string[];

    @Column({
        type: DataType.JSON,
        allowNull: true
    })
    declare antonyms: string[];

    @ForeignKey(() => Word)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare wordId: number;

    @BelongsTo(() => Word)
    declare word: NonAttribute<Word>;
}

export default Definition;