import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {LayoutModule} from "./layout/layout.module";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ProfilePageComponent} from "./features/user-profile/profile-page/profile-page.component";
import {InterceptorInterceptor} from "./core/interceptors/interceptor.interceptor";
import {MAT_AUTOCOMPLETE_SCROLL_STRATEGY} from "@angular/material/autocomplete";
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from "@angular/material/select";
import {ScrollingModule} from "@angular/cdk/scrolling";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/user-profile/user-profile.module').then(m => m.UserProfileModule),
  },
  {
    path: "profile",
    loadChildren: () => import('./features/user-profile/user-profile.module').then(m => m.UserProfileModule),
    component: ProfilePageComponent
  },
  {
    path: "books",
    loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule),
  },
  {
    path: "shelves",
    loadChildren: () => import('./features/shelves/shelves.module').then(m => m.ShelvesModule),
  }

];


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatButtonModule,
        MatTableModule,
        LayoutModule,
        MatIconModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        MatDialogModule,
      MatDatepickerModule,
      MatNativeDateModule,
      ScrollingModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
    // ,
    // {
    //   provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
    //   useValue: MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
