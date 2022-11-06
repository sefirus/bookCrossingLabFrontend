import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageComponent } from './books-page/books-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ViewBookPageComponent } from './view-book-page/view-book-page.component';

const routes: Routes = [
  {
    path: 'by-category/:id',
    component: BooksPageComponent,
    data: {allowedRoles: ['Admin']}
  },
  {
    path: ':id',
    component: ViewBookPageComponent,
  }
];

@NgModule({
  declarations: [
    BooksPageComponent,
    ViewBookPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    NgxSliderModule
  ],
  exports: [RouterModule]
})
export class LibraryModule { }
