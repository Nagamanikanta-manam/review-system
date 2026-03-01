import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Token } from './token.entity';
import { Device } from '../devices/device.entity';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([Token, Device])
  ],
  providers: [TokensService],
  controllers: [TokensController],
  exports: [TokensService]
})
export class TokensModule {}