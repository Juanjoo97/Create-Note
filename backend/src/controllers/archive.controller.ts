/* eslint-disable prettier/prettier */

import { Controller, Post, Param, InternalServerErrorException } from '@nestjs/common';
import { NoteService } from '../service/app.service';

@Controller('archived')
export class ArchiveController {
  constructor(private readonly noteService: NoteService) { }

  //Archive
  @Post('archived/:id')
  async archiveNote(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.noteService.archive(+id);
      return { message: 'Nota archivada correctamente' };
    } catch (error) {
      console.error('Error al archivar la nota:', error);
      throw new InternalServerErrorException('Error interno al archivar la nota');
    }
  }

  //Unarchive
  @Post('unarchived/:id')
  async unarchiveNote(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.noteService.unarchive(+id);
      return { message: 'Nota unarchivada correctamente' };
    } catch (error) {
      console.error('Error al unarchivar la nota:', error);
      throw new InternalServerErrorException('Error interno al archivar la nota');
    }
  }
}
