import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePageComponentsComponent } from './pages/createnote/createPageComponents/createPageComponents.component';
import { UpdatePageComponentsComponent } from './pages/archivednote/ArchivedPageComponents/ArchivedPageComponents.component';
import { NoteRoutingModule } from './Note-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports:[NoteRoutingModule],
  declarations: [CreatePageComponentsComponent, UpdatePageComponentsComponent]
})
export class NoteModule { }
