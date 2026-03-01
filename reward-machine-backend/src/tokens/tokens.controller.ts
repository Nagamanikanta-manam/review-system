import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {

  constructor(
    private readonly tokensService: TokensService,
  ) {}

  @Get('generate/:deviceId')
  async generateToken(
    @Param('deviceId', ParseIntPipe) deviceId: number,
  ) {
    return this.tokensService.generateToken(deviceId);
  }
}