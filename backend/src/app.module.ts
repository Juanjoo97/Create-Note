import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Note } from './app.entity';
import { NoteService } from './service/app.service';
import { NoteController } from './controllers/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  providers: [NoteService],
  controllers: [NoteController],
})
export class AppModule {}
