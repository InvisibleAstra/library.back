import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class UsersModel extends Model<UsersModel, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'primary key' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'aleks.kalina@gmail.com', description: 'email' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: 'aq123dg4223', description: 'password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
