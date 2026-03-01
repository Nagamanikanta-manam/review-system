import { Controller, Post, Body } from '@nestjs/common';
import { RedemptionsService } from './redemptions.service';

@Controller('redeem')
export class RedemptionsController {

  constructor(private readonly redemptionService: RedemptionsService) {}

  @Post()
  async redeem(@Body() body: {
    token: string;
    rating: number;
  }) {
    return this.redemptionService.redeem(
      body.token,
      body.rating,
    );
  }
}