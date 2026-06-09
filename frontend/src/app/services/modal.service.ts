import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Note } from '../interfaces/note.interface';
import { ModalComponent } from '../pages/modal/modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private noteFormEdit!: FormGroup;
    private componentRef!: ComponentRef<ModalComponent>;
    private componentSubscriber!: Subject<string>;
    notaSeleccionada: Note | null = null;
    private _message: Subject<string> = new Subject<string>();
    openModal(entry: ViewContainerRef, modalIsSuccess: string, modaltype: string, modalTitle?: string, modalBody?: string) {
        const componentFactory = entry.createComponent(ModalComponent);
        this.componentRef = componentFactory;
        this.componentRef.instance.type = modaltype;
        this.componentRef.instance.title = modalTitle ?? '';
        this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
        this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
        this.componentSubscriber = new Subject<string>();
        return this.componentSubscriber.asObservable();
    }

    sendMessage(message: string) {
        this._message.next(message);
    }

    getMessage(): Observable<any> {
        return this._message.asObservable();
    }

    closeModal() {
        if (this.componentSubscriber) {
            this.componentSubscriber.next('close');
            this.componentSubscriber.complete();
            this.componentRef.destroy();
        }
    }

    confirm() {
        this.componentSubscriber.next('confirm');
        this.componentSubscriber.complete();
        this.componentRef.destroy();
    }

    setNoteForm(form: FormGroup) {
        this.noteFormEdit = form;

    }

    setNote(nota: Note) {
        this.notaSeleccionada = nota;
    }

    getNoteForm(): FormGroup {
        return this.noteFormEdit
    }

    getNote(): Note | null {
        return this.notaSeleccionada
    }
}

