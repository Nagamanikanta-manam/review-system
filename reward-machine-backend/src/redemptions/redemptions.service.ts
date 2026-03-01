import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Redemption } from './redemption.entity';
import { TokensService } from '../tokens/tokens.service';
import { MqttService } from 'src/mqtt/mqtt.service';
@Injectable()
export class RedemptionsService {

    constructor(
        @InjectRepository(Redemption)
        private readonly redemptionRepo: EntityRepository<Redemption>,
        private readonly mqttService: MqttService,
        private readonly tokensService: TokensService,
        private readonly em: EntityManager,
    ) { }

    async redeem(tokenValue: string, rating: number) {

        return this.em.transactional(async () => {

            const token = await this.tokensService.validateToken(tokenValue);



            const redemption = this.redemptionRepo.create({
                device: token.device,
                rating,
            });

            await this.tokensService.markTokenUsed(token);

            await this.em.persist(redemption);
            this.mqttService.publish(
                `device/${token.device.id}/commands`,
                { action: 'dispense' },
            );
            return { status: 'success' };
        });
    }
}