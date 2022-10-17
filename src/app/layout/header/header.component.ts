import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";

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
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {

  }
}
