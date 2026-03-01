import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Device } from '../devices/device.entity';

@Entity()
export class Token {

  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  token!: string;

  @ManyToOne(() => Device)
  device!: Device;

  @Property()
  expiresAt!: Date;

  @Property({ default: false })
  used!: boolean;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;
}