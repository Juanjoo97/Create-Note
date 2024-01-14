import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'Note',
    loadChildren:()=>import("./note/Note.module").then(m=>m.NoteModule)
  },
    {
    path: 'archivados',  // Nueva ruta para Archivados a nivel de la aplicación principal
    loadChildren: () => import('./note/Note.module').then(m => m.NoteModule)
  },
  {
    path:'',
    redirectTo:'Note',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
