import { MqttModule } from "src/mqtt/mqtt.module";

import { Module } from '@nestjs/common';
import { RedemptionsController } from "./redemptions.controller";
import { RedemptionsService } from "./redemptions.service";
import { TokensModule } from "src/tokens/tokens.module";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Redemption } from "./redemption.entity";

@Module({
  providers: [RedemptionsService],
  exports: [],
  controllers:[RedemptionsController],
  imports:[ MikroOrmModule.forFeature([Redemption]),MqttModule,TokensModule]
})
export class RedemptionsModule {}