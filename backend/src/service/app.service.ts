import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../app.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(id: number): Promise<Note> {
    return this.noteRepository.findOne({ where: { id } });
  }

  create(noteData: Partial<Note>): Promise<Note> {
    const note = this.noteRepository.create(noteData);
    return this.noteRepository.save(note);
  }

  async update(id: number, noteData: Partial<Note>): Promise<Note> {
    await this.noteRepository.update(id, noteData);
    return this.noteRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.noteRepository.delete(id);
    return result.affected > 0;
  }

  async archive(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');
    note.archived = true;
    return this.noteRepository.save(note);
  }

  async unarchive(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');
    note.archived = false;
    return this.noteRepository.save(note);
  }
}
