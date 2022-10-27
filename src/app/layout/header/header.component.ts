import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../features/user-profile/login/login.component";
import {RegisterComponent} from "../../features/user-profile/register/register.component";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../core/models/Category";
import configData from "../../../assets/config.json";

let apiBase = configData.apiBase


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  userId: number = 0;
  profilePictureLink?: string;
  parentMenuCategory?: Category

  constructor(
    public authService: AuthService,
    private matDialog : MatDialog,
    private http : HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get<Category>(`${apiBase}/categories`).subscribe(data => {
      this.parentMenuCategory = data;
    })
  }

  onLogout(): void {
    this.authService.logout()
    this.router.navigate(['']);
  }

  onLogin(): void{
    const dialogRef = this.matDialog.open(LoginComponent, {
      data: {email: "", password : ""}
    });
  }

  onRegister(): void{
    const dialogRef = this.matDialog.open(RegisterComponent, {
      data: {email: "", password : ""}
    });
  }
}
