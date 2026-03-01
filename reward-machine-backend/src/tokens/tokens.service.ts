import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { randomUUID } from 'crypto';

import { Token } from './token.entity';
import { Device } from '../devices/device.entity';

@Injectable()
export class TokensService {

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepo: EntityRepository<Token>,

    @InjectRepository(Device)
    private readonly deviceRepo: EntityRepository<Device>,

    private readonly em: EntityManager,
  ) {}

  async generateToken(deviceId: number) {
    const device = await this.deviceRepo.findOne(deviceId);

    if (!device) throw new NotFoundException('Device not found');
    if (device.status !== 'active')
      throw new BadRequestException('Device inactive');

    const token = this.tokenRepo.create({
      token: randomUUID(),
      device,
      expiresAt: new Date(Date.now() + 60000),
      used: false,
    });

    await this.em.persistAndFlush(token);

    return {
      token: token.token,
      expiresIn: 60,
    };
  }

  async validateToken(tokenValue: string) {
    const token = await this.tokenRepo.findOne(
      { token: tokenValue },
    );

    if (!token) throw new BadRequestException('Invalid token');
    if (token.used) throw new BadRequestException('Token already used');
    if (token.expiresAt < new Date())
      throw new BadRequestException('Token expired');

    return token;
  }

  async markTokenUsed(token: Token) {
    token.used = true;
    await this.em.flush();
  }
}