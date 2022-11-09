import { Component, OnInit } from '@angular/core';
import {Shelf} from "../../../core/models/Shelf";
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";
import {ActivatedRoute, Router} from "@angular/router";

let apiBase = configData.apiBase


@Component({
  selector: 'app-view-shelf-page',
  templateUrl: './view-shelf-page.component.html',
  styleUrls: ['./view-shelf-page.component.sass']
})
export class ViewShelfPageComponent implements OnInit {
  currentShelf?: Shelf;
  constructor(
    private http : HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const shelfId = this.route.snapshot.params['id'] as number;
    this.http.get<Shelf>(`${apiBase}/shelves/${shelfId}`)
      .subscribe(data => {
        this.currentShelf = data;
      })
  }

}
