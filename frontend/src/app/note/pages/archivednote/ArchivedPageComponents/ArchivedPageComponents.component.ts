import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar módulos relacionados con formularios
import { Note } from 'src/app/note/interfaces/note.interface';
import { NoteService } from 'src/app/note/services/note.service';

@Component({
  selector: 'app-UpdatePageComponents',
  templateUrl: './ArchivedPageComponents.component.html',
  styleUrls: ['./ArchivedPageComponents.component.css']
})


export class UpdatePageComponentsComponent implements OnInit {
  edicion = false;
  public intentoEnvio = false;
  notaSeleccionada: Note | null = null; // Agrega esta línea
  public notes: Note[] = [];
  public noteForm: FormGroup; // Nuevo formulario
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @ViewChild('titleInput', { static: false }) titleInput!: ElementRef<HTMLInputElement>;
  constructor(private noteService: NoteService, private fb: FormBuilder) {
    // Inicializar el formulario en el constructor
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(notes => this.notes = notes);
    this.cargarNotas();
  }


  enviarFormulario(event: Event) {
    event.preventDefault();
    this.intentoEnvio = true;
    if (this.noteForm.valid) {
      const formData = this.noteForm.value;

      if (this.edicion && this.notaSeleccionada) {
        // Lógica de actualización utilizando this.notaSeleccionada.id
        const notaId = this.notaSeleccionada.id;

        if (notaId !== null && notaId !== undefined) {
          this.noteService.actualizarNota(notaId, formData).subscribe(
            response => {
              console.log('Nota actualizada:', response);

              // Actualizar directamente la nota en el array de notas
              const indice = this.notes.findIndex(n => n.id === notaId);
              if (indice !== -1) {
                this.notes[indice] = { ...this.notaSeleccionada, ...formData };
              }

              this.noteForm.reset();
              this.edicion = false;
              // Otra lógica después de la actualización...
            },
            error => {
              console.error('Error al actualizar la nota:', error);
            }
          );
        } else {
          console.error('El ID de la nota es nulo o indefinido');
        }
      } else {
        // Lógica de creación
        this.noteService.guardarNota(formData).subscribe(
          response => {
            console.log('Nota guardada:', response);
            this.cargarNotas();
            this.noteForm.reset();
            // Otra lógica después de la creación...
          },
          error => {
            console.error('Error al guardar la nota:', error);
          }
        );
      }
    } else {
      console.error('Formulario no válido');
    }
  }

  cargarNotas() {
    this.noteService.getNotes().subscribe(
      (notes) => {
        // Filtrar las notas donde archived es false
        this.notes = notes.filter((note) => note.archived);
      },
      (error) => {
        console.error('Error al obtener notas:', error);
      }
    );
  }

  eliminarNota(id: number) {
    this.noteService.eliminarNota(id).subscribe(
      response => {
        console.log('Nota eliminada:', response);
        // Recargar la lista de notas después de la eliminación
        this.cargarNotas();
      },
      error => {
        console.error('Error al eliminar la nota:', error);
      }
    );
  }
  abrirFormularioEdicion(nota: Note) {
    this.notaSeleccionada = nota;
    if (this.notaSeleccionada) {
      this.noteForm.setValue({
        title: this.notaSeleccionada.title,
        content: this.notaSeleccionada.content
      });
      this.edicion = true;
    }
  }


  adjustTextarea() {
    const textareaElement = this.textarea.nativeElement;
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight}px`;
  }

  adjustInputHeight() {
    const element = this.titleInput.nativeElement;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }

  unarchivarNota(id: number) {
    this.noteService.unarchivarNota(id).subscribe(
      (response) => {
        console.log('Nota archivada:', response);
        this.cargarNotas();
      },
      (error) => {
        console.error('Error al archivar la nota:', error);
      }
    );
  }

}
