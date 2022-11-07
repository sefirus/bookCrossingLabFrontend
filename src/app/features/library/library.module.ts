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
import {MatIconModule} from "@angular/material/icon";
import { NewBookDialogComponent } from './new-book-dialog/new-book-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from "@angular/material/select";
import {ScrollingModule} from "@angular/cdk/scrolling";

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
    ViewBookPageComponent,
    NewBookDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    NgxSliderModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ScrollingModule
  ],
  exports: [RouterModule]
  // ,
  // providers: [
  //   {
  //     provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
  //     useValue: MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  //   }
  // ]
})
export class LibraryModule { }
