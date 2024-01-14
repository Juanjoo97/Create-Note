// note.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NoteService } from '../service/app.service';
import { Note } from '../app.entity';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  //GetAllNotes
  @Get()
  async findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  //GetidNotes

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Note> {
    return this.noteService.findOne(+id);
  }

  //PostNotes
  @Post()
  async create(@Body() noteData: Partial<Note>): Promise<Note> {
    return this.noteService.create(noteData);
  }
  //PutNotes
  @Put(':id')
  async update(@Param('id') id: string, @Body() noteData: Partial<Note>): Promise<Note> {
    return this.noteService.update(+id, noteData);
  }
  //PutNotes
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.noteService.delete(+id);
  }

}
