import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InfoDto } from './dto/info.dto';

import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(/*@Param('id') id*/) {
    return 'Info';
  }

  @Post('/create')
  async createInfo(@Body() dto: InfoDto) {
    await this.infoService.createInfo(dto);
  }

  @Post('/getInfo')
  async getInfo(@Body() title: any) {
    return await this.infoService.getInfo(title.infoName);
  }

  @Post('/createArticle')
  async createArticle(@Body() dto: InfoDto) {
    await this.infoService.createInfo(dto);
  }

  @Get('/getAllArticles')
  async getAllArticles() {
    return await this.infoService.getAllArticles();
  }
}
