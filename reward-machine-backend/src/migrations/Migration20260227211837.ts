import { Migration } from '@mikro-orm/migrations';

export class Migration20260227211837 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "device" ("id" serial primary key, "status" varchar(255) not null default 'active', "created_at" timestamptz not null);`);

    this.addSql(`create table "device_command" ("id" serial primary key, "device_id" int not null, "action" varchar(255) not null, "status" varchar(255) not null default 'pending', "created_at" timestamptz not null);`);

    this.addSql(`create table "redemption" ("id" serial primary key, "device_id" int not null, "rating" int not null, "created_at" timestamptz not null);`);

    this.addSql(`create table "token" ("id" serial primary key, "token" varchar(255) not null, "device_id" int not null, "expires_at" timestamptz not null, "used" boolean not null default false, "used_by_mobile" varchar(255) null, "created_at" timestamptz not null);`);
    this.addSql(`alter table "token" add constraint "token_token_unique" unique ("token");`);

    this.addSql(`alter table "device_command" add constraint "device_command_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade;`);

    this.addSql(`alter table "redemption" add constraint "redemption_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade;`);

    this.addSql(`alter table "token" add constraint "token_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "device_command" drop constraint "device_command_device_id_foreign";`);

    this.addSql(`alter table "redemption" drop constraint "redemption_device_id_foreign";`);

    this.addSql(`alter table "token" drop constraint "token_device_id_foreign";`);

    this.addSql(`drop table if exists "device" cascade;`);

    this.addSql(`drop table if exists "device_command" cascade;`);

    this.addSql(`drop table if exists "redemption" cascade;`);

    this.addSql(`drop table if exists "token" cascade;`);
  }

}
