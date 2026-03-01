import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('device')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}
  @Post('create')
  async createDevice() {
    return this.devicesService.createDevice();
  }

}