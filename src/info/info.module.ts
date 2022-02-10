import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { InfoModel } from '../models/info.model';

@Module({
  controllers: [InfoController],
  providers: [InfoService],
  imports: [
    SequelizeModule.forFeature([InfoModel]),
    JwtModule.register({}),
    AuthModule,
  ],
})
export class InfoModule {}
