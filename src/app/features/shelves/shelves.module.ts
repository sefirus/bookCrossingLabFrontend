import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShelvesPageComponent } from './shelves-page/shelves-page.component';
import { ViewShelfPageComponent } from './view-shelf-page/view-shelf-page.component';
import { CreateShelfDialogComponent } from './create-shelf-dialog/create-shelf-dialog.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";



@NgModule({
  declarations: [
    ShelvesPageComponent,
    ViewShelfPageComponent,
    CreateShelfDialogComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class ShelvesModule { }
