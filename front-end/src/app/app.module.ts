import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { VerticalToolbarComponent } from './components/vertical-toolbar/vertical-toolbar.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FirmAuthFormComponent } from './modules/firm-auth/firm-auth-form/firm-auth-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FirmAuthFormComponent,
    VerticalToolbarComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    HttpClientModule // Import HttpClientModule here
  ],
  providers: [
    // Add this provider
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
