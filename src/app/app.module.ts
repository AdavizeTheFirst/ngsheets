import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { ViewPageComponent } from './view-page/view-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    UploadPageComponent,
    ViewPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
