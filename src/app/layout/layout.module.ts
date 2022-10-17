import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class LayoutModule { }
