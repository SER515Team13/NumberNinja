import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatMenuModule, MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToollbarComponent } from './toollbar/toollbar.component';
import { TeachertoolbarComponent } from './teachertoolbar/teachertoolbar.component';
import { AdmintoolbarComponent } from './admintoolbar/admintoolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToollbarComponent,
    TeachertoolbarComponent,
    AdmintoolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
