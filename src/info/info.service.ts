import { Injectable } from '@nestjs/common';
import { InfoModel } from '../models/info.model';
import { InfoDto } from './dto/info.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class InfoService {
  constructor(@InjectModel(InfoModel) private infoRepo: typeof InfoModel) {}

  async createInfo(dto: InfoDto) {
    await this.infoRepo.create(dto);
  }

  async getInfo(title: string) {
    const information = await this.infoRepo.findOne({
      where: { title },
      include: { all: true },
    });
    return information;
  }

  async getAllArticles() {
    return this.infoRepo.findAll();
  }
}
