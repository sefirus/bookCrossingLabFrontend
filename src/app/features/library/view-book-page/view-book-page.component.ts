import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../../core/models/Book";
import configData from "../../../../assets/config.json";

let apiBase = configData.apiBase


@Component({
  selector: 'app-view-book-page',
  templateUrl: './view-book-page.component.html',
  styleUrls: ['./view-book-page.component.sass']
})
export class ViewBookPageComponent implements OnInit {
  public book?: Book

  constructor(
    private http : HttpClient,
    private router: Router,
    private route: ActivatedRoute) {
      this.updateContent();
      this.route.paramMap.subscribe(() => {
        this.updateContent();
      })
  }

  private updateContent(): void{
    const bookId = this.route.snapshot.params['id'] as number;
    this.http.get<Book>(`${apiBase}/books/${bookId}`).subscribe(data => {
      this.book = data;
      console.log(data)
    })
  }

  getBookWriters(): string{
    if(this.book == null)
      return "";
    let result = this.book?.writers[0]?.fullName;
    for (let i = 1; i < this.book?.writers?.length; i++){
      result += `, ${this.book.writers[i].fullName}`
    }
    return result;
  }

  ngOnInit(): void {
  }

}
