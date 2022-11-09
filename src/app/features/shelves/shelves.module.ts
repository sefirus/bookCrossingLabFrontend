import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShelvesPageComponent } from './shelves-page/shelves-page.component';
import { ViewShelfPageComponent } from './view-shelf-page/view-shelf-page.component';
import { CreateShelfDialogComponent } from './create-shelf-dialog/create-shelf-dialog.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

const routes: Routes = [
  {
    path: '',
    component: ShelvesPageComponent,
  },
  {
    path: ':id',
    component: ViewShelfPageComponent,
  }
];

@NgModule({
  declarations: [
    ShelvesPageComponent,
    ViewShelfPageComponent,
    CreateShelfDialogComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [
    RouterModule
  ]
})
export class ShelvesModule { }
