import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Token } from '../tokens/token.entity';
import { Redemption } from '../redemptions/redemption.entity';

@Entity()
export class Device {

  @PrimaryKey()
  id!: number;

  @Property({ default: 'active' })
  status!: string;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @OneToMany(() => Token, token => token.device)
  tokens = new Collection<Token>(this);

  @OneToMany(() => Redemption, redemption => redemption.device)
  redemptions = new Collection<Redemption>(this);

}