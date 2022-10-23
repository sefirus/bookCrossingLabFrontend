import { Component, OnInit } from '@angular/core';
import {User} from "../../../core/models/User";
import {AuthService} from "../../../core/services/auth.service";
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";
import {Router} from "@angular/router";

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
    private router: Router
  ) {
    http.get<User>(`${apiBase}/users/${auth.getUserId()}`)
      .subscribe(data => {
        this.currentUser = data;
      }, error => {
        this.router.navigate(['']);
      })
  }

  ngOnInit(): void {
  }

  onEdit(): void{

  }
}
