import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Book} from "../../../core/models/Book";
import * as http from "http";
import {Category} from "../../../core/models/Category";

let apiBase = configData.apiBase

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.sass']
})
export class BooksPageComponent implements OnInit {
  public books?: Book[]
  public currentCategory?: Category;

  constructor(
    private http : HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.updateContent();
    this.route.paramMap.subscribe(() => {
      this.updateContent();
    })}

  ngOnInit(): void {

  }

  updateContent(): void {
    const currentCategoryId = this.route.snapshot.params['id'] as number;

    const filtersModel = {
      categoryIds: [currentCategoryId],
      writerIds: [],
      publisherIds:[],
      minPageCount: 0,
      maxPageCount: 100000,
      language: []
    }
      this.http.get<any>(`${apiBase}/books/category/${currentCategoryId}`).subscribe(data => {
        this.books = data;
      })
    this.http.get<Category>(`${apiBase}/categories`).subscribe(data => {
      data.childCategories.forEach(cat =>{
        if(cat.id == currentCategoryId){
          this.currentCategory = cat;
        } else {
          cat.childCategories.forEach(innerCategory =>{
            if(innerCategory.id == currentCategoryId){
              this.currentCategory = innerCategory;
            }
          })
        }
      })
    })
  }
}
