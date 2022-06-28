import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '',
      port: null,
      username: '',
      password: '',
      database: '',
      entities: [
        join(
          __dirname,
          'infra',
          'repositories',
          '**',
          'typeorm',
          '*.model.{ts,js}',
        ),
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
