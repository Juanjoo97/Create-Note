// note.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../app.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  // GetAll
  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }
  // GetId
  async findOne(id: number): Promise<Note> {
    return await this.noteRepository.findOne({ where: { id } });
  }
  
// Post
  async create(noteData: Partial<Note>): Promise<Note> {
    const newNote = this.noteRepository.create(noteData);
    return await this.noteRepository.save(newNote);
  }
// Put
  async update(id: number, noteData: Partial<Note>): Promise<Note> {
    await this.noteRepository.update(id, noteData);
    return await this.noteRepository.findOne({ where: { id } });
  }

  // Delete
  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.noteRepository.delete(id);
    return deleteResult.affected > 0;
  }

    // archive
  async archive(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id }});
    if (!note) {
      throw new Error('Nota no encontrada');
    }

    note.archived = true;
    return await this.noteRepository.save(note);
  }
    // unarchive
  async unarchive(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id }});
    if (!note) {
      throw new Error('Nota no encontrada');
    }

    note.archived = false;
    return await this.noteRepository.save(note);
  }
  
      // findAllActive
  async findAllActive(): Promise<Note[]> {
    return await this.noteRepository.find({ where: { archived: false } });
  }

        // findAllArchived
  async findAllArchived(): Promise<Note[]> {
    return await this.noteRepository.find({ where: { archived: true } });
  }

}
