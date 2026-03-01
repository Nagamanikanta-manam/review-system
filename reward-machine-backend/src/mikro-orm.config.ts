import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Device } from './devices/device.entity';
import { Token } from './tokens/token.entity';
import { Redemption } from './redemptions/redemption.entity';

const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  dbName: 'rewarddb',
  entities: [Device, Token, Redemption],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
  debug: true,
};

export default config;