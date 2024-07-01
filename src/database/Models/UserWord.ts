import {BelongsTo, Column, DataType, ForeignKey, Table, Model, Validate, BelongsToMany} from "sequelize-typescript";
import Language from "./Language";
import Metadata from "./Metadata";
import {CreationOptional, NonAttribute} from "sequelize";
import User from "./User";
import Word from "./Word";

@Table({
    timestamps: true,
    tableName: "user_word",
    modelName: "UserWord",
    underscored: true,
})
class UserWord extends Model{
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare userId: User;

    @ForeignKey(() => Word)
    @Column({
        type: DataType.INTEGER
    })
    declare wordId: Word;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default UserWord;