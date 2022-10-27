import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Book} from "../../../core/models/Book";
import {Category} from "../../../core/models/Category";
import {FilteredBooks} from "../../../core/models/FilteredBooks";
import {MatCheckboxChange} from "@angular/material/checkbox";

let apiBase = configData.apiBase

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.sass']
})
export class BooksPageComponent implements OnInit {
  public books?: Book[]
  public currentCategory?: Category;
  public filteredModel?: FilteredBooks;
  public hasFilterChanged: boolean = false
  private selectedWriterIds: number[] = [];
  private selectedPublisherIds: number[] = [];
  private selectedCategoryIds: number[] = [];


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

      this.http.get<FilteredBooks>(`${apiBase}/books/category/${currentCategoryId}`).subscribe(data => {
        this.books = data.books.entities;
        this.filteredModel = data;
        console.log(data)
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

  public onWriterCheckBox(event: MatCheckboxChange, item: {id: number, fullName: string}): void {
    this.hasFilterChanged = true;
    if(event.checked)
      this.selectedWriterIds.push(item.id);
    else
      this.selectedWriterIds = this.selectedWriterIds.filter(selectedItem => selectedItem != item.id);
  }
}
