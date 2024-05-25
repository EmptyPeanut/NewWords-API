import {BelongsTo, Column, DataType, ForeignKey, Table, Model, Validate} from "sequelize-typescript";
import Metadata from "./Metadata";
@Table({
    timestamps: false,
    tableName: "user",
    modelName: "User",
    underscored: true,
    defaultScope: {
        attributes: {
            exclude: ['metadataId', 'password']
        },
        include: [
            {model: Metadata, as: 'metadata'}
        ]
    }
})
class User extends Model{

    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
    })
    declare id: number;

    @Validate({isEmail: {msg: "Incorrect email address"}, notNull: true})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string;

    @Validate({
        len: {
            msg: "Password must be of 7 to 244 characters",
            args: [7, 244]
        }
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @ForeignKey(() => Metadata)
    @Column({
        type: DataType.INTEGER,
    })
    declare metadataId: number;

    @BelongsTo(() => Metadata)
    declare metadata: Metadata;
}

export default User;