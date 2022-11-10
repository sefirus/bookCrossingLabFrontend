import { Component, OnInit } from '@angular/core';
import {User} from "../../../core/models/User";
import {AuthService} from "../../../core/services/auth.service";
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../edit-user/edit-user.component";

let apiBase = configData.apiBase

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {
  currentUser: User | null = null

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private matDialog : MatDialog,
  ) { }

  ngOnInit(): void {
    this.http.get<User>(`${apiBase}/users/${this.auth.getUserId()}`)
      .subscribe(data => {
        this.currentUser = data;
      }, error => {
        this.router.navigate(['']);
      })
  }

  onEdit(): void{
    const dialogRef = this.matDialog.open(EditUserComponent, {
      data: this.currentUser
    });
    dialogRef.afterClosed().subscribe(
      (needRefresh: boolean) => {
        if(needRefresh){
          this.ngOnInit();
      }
    });
  }

  onNewBookCopy(): void{

  }
}
