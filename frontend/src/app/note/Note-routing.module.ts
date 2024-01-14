import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router'
import { CreatePageComponentsComponent } from './pages/createnote/createPageComponents/createPageComponents.component';
import { UpdatePageComponentsComponent } from './pages/archivednote/ArchivedPageComponents/ArchivedPageComponents.component';

const routes:Routes=[
  {
    path:'',
    component:CreatePageComponentsComponent,
    children:[
      {path:'new-note',component:CreatePageComponentsComponent},
      {path:'**',redirectTo:'archived'},
    ]
  },
  {
    path:'',
    component:UpdatePageComponentsComponent,
    children:[
      {path:'archived',component:UpdatePageComponentsComponent},
      {path:'**',redirectTo:'archived'},
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class NoteRoutingModule { }
