import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Note.module').then(m => m.NoteModule)
  },
  {
    path: '',
    redirectTo: 'Note',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'Note',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
