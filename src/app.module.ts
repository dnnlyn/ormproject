/* eslint-disable prettier/prettier */

import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { JunketModule } from './junket/junket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { JunketEntity } from './junket/entities/junket.entity';

// @Module({
//   imports: [
//     JunketModule,

//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'password',
//       database: 'cms_main_dev',
//       autoLoadEntities: true,
//       synchronize: true,
//     }),
//   ],
// })
// export class AppModule {}

@Module({
  imports: [
    JunketModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL,
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cms_main_dev',
      synchronize: process.env.NODE_ENV !== 'production', // when NOT production => true
      logging:
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test',
      entities: [JunketEntity],
    }),
  ],
})
export class AppModule {}
