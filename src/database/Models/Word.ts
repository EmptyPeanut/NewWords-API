import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Table,
    Model,
    Validate,
    BelongsToMany,
    HasMany
} from "sequelize-typescript";
import Language from "./Language";
import Metadata from "./Metadata";
import {CreationOptional, NonAttribute} from "sequelize";
import User from "./User";
import UserWord from "./UserWord";
import Definition from "./Definition";

@Table({
    timestamps: false,
    tableName: "word",
    modelName: "Word",
    underscored: true,
    defaultScope: {
        attributes: {
            exclude: ['languageId']
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

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    declare type: string;

    @HasMany(() => Definition)
    declare definitions: NonAttribute<Definition[]>

    @BelongsToMany(() => User, () => UserWord)
    declare users: NonAttribute<User[]>;

    @ForeignKey(() => Language)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare languageId: number;

    @BelongsTo(() => Language)
    declare language: Language;
}

export default Word;