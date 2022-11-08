import { Component, OnInit } from '@angular/core';
import {Shelf} from "../../../core/models/Shelf";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import configData from "../../../../assets/config.json";

let apiBase = configData.apiBase

@Component({
  selector: 'app-shelves-page',
  templateUrl: './shelves-page.component.html',
  styleUrls: ['./shelves-page.component.sass']
})
export class ShelvesPageComponent implements OnInit {
  shelves? : Shelf[];
  constructor(
    private http : HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private matDialog : MatDialog,
  ) { }

  ngOnInit(): void {
    this.updateContent()
  }

  updateContent() : void{
    this.http.get<Shelf[]>(`${apiBase}/shelves`)
      .subscribe(data => {
        this.shelves = data;
      })
  }

  onOpenShelf(shelf: Shelf): void{

  }

  onNewShelf(): void{

  }
}
