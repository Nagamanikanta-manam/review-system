import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { randomUUID } from 'crypto';

import { Device } from './device.entity';
import { Token } from '../tokens/token.entity';

@Injectable()
export class DevicesService {

  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: EntityRepository<Device>,

    private readonly em: EntityManager,
  ) {}

  async createDevice() {
  const device = this.deviceRepo.create({
    status: 'active',
  });

  await this.em.persistAndFlush(device);

  return device;
}

}