/* eslint-disable prettier/prettier */
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './app.entity';
import { NoteService } from './service/app.service';
import { NoteController } from './controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { ArchiveController } from './controllers/archive.controller';
import { ActiveNotesController } from './controllers/active-notes.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Note]),
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
  }),],
  providers: [NoteService],
  controllers: [NoteController, ArchiveController, ActiveNotesController],
})
export class AppModule { }