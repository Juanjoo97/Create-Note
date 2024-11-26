import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ArchivedPageComponents } from './pages/archivednote/ArchivedPageComponents.component';
import { CreatePageComponentsComponent } from './pages/createnote/createPageComponents.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePageComponentsComponent,
  },
  {
    path: 'new-note',
    component: CreatePageComponentsComponent,
  },
  {
    path: 'archiveNote',
    component: ArchivedPageComponents,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class NoteRoutingModule { }
