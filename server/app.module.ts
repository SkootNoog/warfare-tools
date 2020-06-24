import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { HelloController } from './hello/hello.controller';
import {UnitsModule} from './units/units.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {User} from './users/user.entity';
import {Unit} from './units/unit.entity';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {Ancestry} from './ancestrys/ancestry.entity';
import {Order} from './orders/order.entity';
import {Trait} from './traits/traits.entity';
import {Army} from './armys/army.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'devdb',
      password: 'devdb',
      database: 'devdb',
      entities: [User, Army, Unit, Ancestry, Order, Trait],
      synchronize: true,
      migrationsTableName: 'migrations',
      migrations: ['migration/*.js'],
      cli: {
        entitiesDir: 'server/users'
      },
    }),
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/warfare-tools/browser')
    }),
    ConfigModule.forRoot({
      envFilePath: ['secret.env']
    }),
    UnitsModule,
    UsersModule,
    //AuthModule
  ],
  controllers: [HelloController]
})
export class AppModule {
  constructor() {}
}
