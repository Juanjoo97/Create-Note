// archived-notes.controller.ts
import { Controller, Get } from '@nestjs/common';
import { NoteService } from '../service/app.service';
import { Note } from '../app.entity';

@Controller('archived-notes')
export class ArchivedNotesController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async findAllArchived(): Promise<Note[]> {
    return this.noteService.findAllArchived();
  }
}
