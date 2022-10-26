import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";

let apiBase = configData.apiBase

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.sass']
})
export class BooksPageComponent implements OnInit {
  

  constructor(
    private http : HttpClient
  ) { }

  ngOnInit(): void {

  }

}
