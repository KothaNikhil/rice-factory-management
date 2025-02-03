import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmAuthRoutingModule } from './firm-auth-routing.module';
import { FormsModule } from '@angular/forms';
import { FirmAuthFormComponent } from './firm-auth-form/firm-auth-form.component';


@NgModule({
  declarations: [
    FirmAuthFormComponent
  ],
  imports: [
    CommonModule,
    FirmAuthRoutingModule,
    FormsModule
  ]
})
export class FirmAuthModule { }
