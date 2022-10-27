import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageComponent } from './books-page/books-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: 'by-category/:id',
    component: BooksPageComponent,
    data: {allowedRoles: ['Admin']}
  }
];

@NgModule({
  declarations: [
    BooksPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class LibraryModule { }
