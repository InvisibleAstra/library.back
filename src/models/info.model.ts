import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface InfoCreationAttributes {
  title: string;
  text: string;
}

@Table({ tableName: 'info' })
export class InfoModel extends Model<InfoModel, InfoCreationAttributes> {
  @ApiProperty({ example: '1', description: 'primary key' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'primary key' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: '1', description: 'primary key' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;
}
