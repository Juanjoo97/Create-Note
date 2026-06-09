import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteRoutingModule } from './Note-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from './pages/modal/modal.component';
import { ArchivedPageComponents } from './pages/archivednote/ArchivedPageComponents.component';
import { CreatePageComponentsComponent } from './pages/createnote/createPageComponents.component';
@NgModule({
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [NoteRoutingModule],
  declarations: [CreatePageComponentsComponent, ArchivedPageComponents, ModalComponent]
})
export class NoteModule { }
