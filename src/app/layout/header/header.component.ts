import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../features/user-profile/login/login.component";
import {RegisterComponent} from "../../features/user-profile/register/register.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  userId: number = 0;
  profilePictureLink?: string;

  constructor(
    public authService: AuthService,
    private matDialog : MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onLogout(): void {
    this.authService.logout()
    this.router.navigate(['']);
  }

  onLogin(): void{
    //this.authService.login("SuperAdminPassword", "admin@email.com").subscribe()
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
