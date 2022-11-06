import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageComponent } from './books-page/books-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import { BookCardComponent } from './book-card/book-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { NgxSliderModule } from '@angular-slider/ngx-slider';

const routes: Routes = [
  {
    path: 'by-category/:id',
    component: BooksPageComponent,
    data: {allowedRoles: ['Admin']}
  }
];

@NgModule({
  declarations: [
    BooksPageComponent,
    BookCardComponent
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
