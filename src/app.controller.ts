import {
  Body, Controller, Post, Get, HttpCode, UseGuards,
} from '@nestjs/common';
import { Client } from 'discord.js';
import { AppService } from './app.service';
import { PayloadDto } from './payload.dto';
import { OriginGuard } from './origin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(new OriginGuard())
  @Post('linear')
  async getNotification(@Body() req, res): Promise<void> {
    const payload: PayloadDto = req;
    const client = new Client();

    await client.login(process.env.TOKEN);
    return this.appService.getNotification(client, payload);
  }

  @Get('/')
  @HttpCode(200)
  default() {
    return 'Ok';
  }
}
