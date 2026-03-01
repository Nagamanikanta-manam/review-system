import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { TokensModule } from './tokens/tokens.module';
import { RedemptionsModule } from './redemptions/redemptions.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    DevicesModule,
    TokensModule,
    RedemptionsModule,
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }