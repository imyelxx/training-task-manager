import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//--component
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TaskDialogComponent } from './task-manager/task-dialog/task-dialog.component';
import { ConfirmationDialogComponent } from './task-manager/confirmation-dialog/confirmation-dialog.component';
import { ConvertToSpacesPipe } from './shared/pipes/convert-to-spaces.pipe';
import { RatingComponentComponent } from './shared/rating-component/rating-component.component';
import { TagComponent } from './task-manager/task-dialog/tag/tag.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    TaskDialogComponent,
    ConfirmationDialogComponent,
    ConvertToSpacesPipe,
    RatingComponentComponent,
    TagComponent,
  ],
  exports: [ ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
