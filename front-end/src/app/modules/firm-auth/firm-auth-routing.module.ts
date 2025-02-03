import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmAuthFormComponent } from './firm-auth-form/firm-auth-form.component';

const routes: Routes = [
  { path: '', component: FirmAuthFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmAuthRoutingModule { }
