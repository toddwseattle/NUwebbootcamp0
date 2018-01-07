import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { IdListComponent } from './id-list/id-list.component';
import { GitIdInfoService } from './git-id-info.service';


@NgModule({
  declarations: [
    AppComponent,
    IdListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [GitIdInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
