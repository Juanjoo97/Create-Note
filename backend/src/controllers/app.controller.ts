import { Controller, Get, Post, Put, Patch, Delete, Param, Body, InternalServerErrorException } from '@nestjs/common';
import { NoteService } from '../service/app.service';
import { Note } from '../app.entity';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note> {
    return this.noteService.findOne(+id);
  }

  @Post()
  create(@Body() noteData: Partial<Note>): Promise<Note> {
    return this.noteService.create(noteData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() noteData: Partial<Note>): Promise<Note> {
    return this.noteService.update(+id, noteData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.noteService.delete(+id);
  }

  @Patch(':id/archive')
  async archiveNote(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.noteService.archive(+id);
      return { message: 'Note archived' };
    } catch {
      throw new InternalServerErrorException('Error archiving note');
    }
  }

  @Patch(':id/unarchive')
  async unarchiveNote(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.noteService.unarchive(+id);
      return { message: 'Note unarchived' };
    } catch {
      throw new InternalServerErrorException('Error unarchiving note');
    }
  }
}
