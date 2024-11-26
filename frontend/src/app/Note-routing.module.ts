import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ArchivedPageComponents } from './pages/archivednote/ArchivedPageComponents.component';
import { CreatePageComponentsComponent } from './pages/createnote/createPageComponents.component';

const routes: Routes = [
  {
    path: 'Note',
    component: CreatePageComponentsComponent,
    children: [
      { path: 'new-note', component: CreatePageComponentsComponent },
      { path: '**', redirectTo: '' },
    ]
  },
  {
    path: 'archiveNote',
    component: ArchivedPageComponents,
    children: [
      { path: '', component: ArchivedPageComponents },
      { path: '**', redirectTo: 'archived' },
    ]
  },
  {
    path: '',
    redirectTo: 'Note',
    pathMatch: 'full'
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class NoteRoutingModule { }
