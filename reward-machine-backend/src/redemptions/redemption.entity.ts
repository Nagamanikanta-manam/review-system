import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Device } from '../devices/device.entity';

@Entity()
export class Redemption {

  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Device)
  device!: Device;

  @Property()
  rating!: number;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;
}