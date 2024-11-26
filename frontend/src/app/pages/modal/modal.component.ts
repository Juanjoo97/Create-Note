import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteService } from 'src/app/services/note.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
    selector: 'app-popover',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
    noteFormEdit: any;
    notaSeleccionada: Note | null = null;
    public notes: Note[] = [];
    @Input() isSuccess: string = '';
    @Input() type: string = '';
    @Input() title: string = '';
    @Input() body: string = '';
    @Output() closeMeEvent = new EventEmitter();
    @Output() confirmEvent = new EventEmitter();
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: ModalService, private noteService: NoteService) { }

    ngOnInit(): void {
        this.noteFormEdit = this.modalService.getNoteForm();
        this.notaSeleccionada = this.modalService.getNote()
    }

    cancel() {
        this.modalService.sendMessage("0");
    }

    closeMe() {
        this.modalService.sendMessage("0");
    }

    confirm() {
        this.modalService.sendMessage("1");
    }

    confirmEdit() {
        if (!this.noteFormEdit.valid) {
            console.error('Formulario no válido');
            return;
        }
        const formData = this.noteFormEdit.value;
        const notaId = this.notaSeleccionada?.id;
        if (notaId == null) {
            console.error('El ID de la nota es nulo o indefinido');
            return;
        }
        this.noteService.actualizarNota(notaId, formData).subscribe({
            next: () => {
                this.notes = this.notes.map(n =>
                    n.id === notaId ? { ...n, ...formData } : n
                );
                this.noteFormEdit.reset();
                this.modalService.sendMessage("1");
                this.confirmEvent.emit("nota_actualizada");
            },
            error: error => {
                console.error('Error al actualizar la nota:', error);
            }
        });
    }



}
