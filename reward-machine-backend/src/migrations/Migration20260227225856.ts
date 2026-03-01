import { Migration } from '@mikro-orm/migrations';

export class Migration20260227225856 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop table if exists "device_command" cascade;`);

    this.addSql(`alter table "token" drop column "used_by_mobile";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "device_command" ("id" serial primary key, "device_id" int not null, "action" varchar(255) not null, "status" varchar(255) not null default 'pending', "created_at" timestamptz not null);`);

    this.addSql(`alter table "device_command" add constraint "device_command_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade;`);

    this.addSql(`alter table "token" add column "used_by_mobile" varchar(255) null;`);
  }

}
