import { Module } from '@nestjs/common';
import { InfoModule } from './info/info.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModel } from './models/users.model';
import { InfoModel } from './models/info.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [UsersModel, InfoModel],
      autoLoadModels: true,
    }),
    InfoModule,
    AuthModule,
  ],
})
export class AppModule {}
