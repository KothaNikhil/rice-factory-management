import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { VerticalToolbarComponent } from './components/vertical-toolbar/vertical-toolbar.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';


@NgModule({ declarations: [
        AppComponent,
        VerticalToolbarComponent,
        TopMenuComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
