import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/note/interfaces/note.interface';
import { NoteService } from 'src/app/note/services/note.service';
import { ModalService } from '../../../services/modal.service'

@Component({
  selector: 'app-CreatePageComponents',
  templateUrl: './createPageComponents.component.html',
  styleUrls: ['./createPageComponents.component.scss'],
})

export class CreatePageComponentsComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef })
  public entry!: ViewContainerRef;
  public sub!: Subscription;
  public edicion = false;
  public notaSeleccionada: Note | null = null;
  public notes: Note[] = [];
  public notesSort: Note[] = [];
  public isLoading: boolean = true;
  public noteForm!: FormGroup;
  public noteFormEdit!: FormGroup;
  public sortOrderTitle: 'asc' | 'desc' | 'none' = 'none';
  public sortOrderContent: 'asc' | 'desc' | 'none' = 'none';
  constructor(private noteService: NoteService, private fb: FormBuilder, private cdRef: ChangeDetectorRef, private modalService: ModalService) {
    this.buildForm()
    this.buildFormEdit()
  }

  private buildForm(): void {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  private buildFormEdit(): void {
    this.noteFormEdit = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarNotas();
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    if (this.noteForm.valid) {
      const formData = this.noteForm.value;
      this.noteService.guardarNota(formData).subscribe({
        next: () => {
          this.cargarNotas();
          this.noteForm.reset();
        },
        error: () => {
          this.createModal("1", "4", 'Error creating note');
          this.sub = this.modalService.getMessage().subscribe(() => {
            this.modalService.closeModal();
            this.sub.unsubscribe();
          })
        }
      });
    } else {
      console.error('Formulario no válido');
    }
  }

  cargarNotas() {
    this.sortOrderTitle = 'none';
    this.sortOrderContent = 'none';
    this.noteService.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes.filter((note) => !note.archived);
        this.notesSort = this.notes
        this.isLoading = false;
      },
      error: () => {
        this.createModal("1", "4", 'Error loading');
        this.sub = this.modalService.getMessage().subscribe(() => {
          this.modalService.closeModal();
          this.sub.unsubscribe();
        })
        this.isLoading = false;
      }
    });
  }

  createModal(isSuccess: string, type: string, title?: string, description?: string) {
    this.sub = this.modalService.openModal(
      this.entry,
      isSuccess,
      type,
      title,
      description
    ).subscribe(() => {
    });
  }

  eliminarNota(id: number) {
    this.createModal("1", "1", '¿Are you sure to delete this note?');
    this.sub = this.modalService.getMessage().subscribe(res => {
      if (res === "1") {
        this.noteService.eliminarNota(id).subscribe({
          next: () => {
            this.modalService.closeModal();
            this.cargarNotas();
            this.createModal("1", "2", '¡Note has been successfully deleted!"', "");
            this.sub = this.modalService.getMessage().subscribe(() => {
              this.modalService.closeModal();
              this.sub.unsubscribe();
            })
          },
          error: () => {
            this.modalService.closeModal();
            this.createModal("1", "4", 'Error deleting note');
            this.sub = this.modalService.getMessage().subscribe(() => {
              this.modalService.closeModal();
              this.sub.unsubscribe();
            })
          }
        });
      }
      else {
        this.modalService.closeModal();
      }
      this.sub.unsubscribe();
    })
  }

  abrirFormularioEdicion(nota: Note) {
    this.notaSeleccionada = nota;
    this.createModal("1", "3", 'Edit Note');
    this.modalService.setNoteForm(this.noteFormEdit);
    this.modalService.setNote(this.notaSeleccionada);
    if (this.notaSeleccionada) {
      this.noteFormEdit.setValue({
        title: this.notaSeleccionada.title,
        content: this.notaSeleccionada.content
      });
      this.sub = this.modalService.getMessage().subscribe(() => {
        this.cargarNotas();
        this.sub.unsubscribe();
      });
    }
  }

  archivarNota(id: number) {
    this.noteService.archivarNota(id).subscribe({
      next: () => {
        this.cargarNotas();
        this.cdRef.detectChanges();
      },
      error: () => {
        this.modalService.closeModal();
        this.createModal("1", "4", 'Error archiving note');
        this.sub = this.modalService.getMessage().subscribe(() => {
          this.sub.unsubscribe();
        })
      }
    });
  }

  sortNotes(field: keyof Note) {
    if (field === 'title') {
      if (this.sortOrderTitle === 'asc') {
        this.notesSort = [...this.notesSort].sort((a, b) => {
          if (a.title < b.title) return 1;
          if (a.title > b.title) return -1;
          return 0;
        });
        this.sortOrderTitle = 'desc';
      } else if (this.sortOrderTitle === 'desc') {
        this.notesSort = [...this.notes];
        this.sortOrderTitle = 'none';
      } else {
        this.notesSort = [...this.notesSort].sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
        this.sortOrderTitle = 'asc';
      }
    }

    if (field === 'content') {
      if (this.sortOrderContent === 'asc') {
        this.notesSort = [...this.notesSort].sort((a, b) => {
          if (a.content < b.content) return 1;
          if (a.content > b.content) return -1;
          return 0;
        });
        this.sortOrderContent = 'desc';
      } else if (this.sortOrderContent === 'desc') {
        this.notesSort = [...this.notes];
        this.sortOrderContent = 'none';
      } else {
        this.notesSort = [...this.notesSort].sort((a, b) => {
          if (a.content < b.content) return -1;
          if (a.content > b.content) return 1;
          return 0;
        });
        this.sortOrderContent = 'asc';
      }
    }
  }


}

