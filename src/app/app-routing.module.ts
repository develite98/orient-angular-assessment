import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './routes/form-builder/form-builder.component';

const routes: Routes = [
  {
    path: 'form',
    children: [
      {
        path: 'builder',
        component: FormBuilderComponent
      },
      {
        path: '',
        redirectTo: 'builder',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
