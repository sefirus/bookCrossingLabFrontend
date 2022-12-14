import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { RegisterComponent } from './register/register.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {InterceptorInterceptor} from "../../core/interceptors/interceptor.interceptor";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { CreateBookCopyDialogComponent } from './create-book-copy-dialog/create-book-copy-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfilePageComponent,
    EditUserComponent,
    CreateBookCopyDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatRippleModule,
    MatCardModule,
    MatDividerModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
  ]
})
export class UserProfileModule { }
