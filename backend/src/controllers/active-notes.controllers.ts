
import { Controller, Get } from '@nestjs/common';
import { NoteService } from '../service/app.service';
import { Note } from '../app.entity';

@Controller('active-notes')
export class ActiveNotesController {
  constructor(private readonly noteService: NoteService) {}

//   Active-notes
  @Get()
  async findAllActive(): Promise<Note[]> {
    return this.noteService.findAllActive();
  }
}
