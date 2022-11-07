import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../../core/models/Book";
import {Category} from "../../../core/models/Category";
import {FilteredBooks} from "../../../core/models/FilteredBooks";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Filters} from "../../../core/models/Filters";
import {AuthService} from "../../../core/services/auth.service";
import {RegisterComponent} from "../../user-profile/register/register.component";
import {MatDialog} from "@angular/material/dialog";
import {NewBookDialogComponent} from "../new-book-dialog/new-book-dialog.component";

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
  public hasCheckboxesChanged: boolean = false
  private selectedWriterIds: number[] = [];
  private selectedPublisherIds: number[] = [];
  private selectedCategoryIds: number[] = [];
  public selectedMaxPageCount: number = 0;
  public selectedMinPageCount: number = 0;


  constructor(
    private http : HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private matDialog : MatDialog,
  ) {
    this.updateContent();
    this.route.paramMap.subscribe(() => {
      this.updateContent();
    })}

  ngOnInit(): void {
  }

  public hasFilterChanged(): boolean{
    return this.hasCheckboxesChanged
      || (this.selectedMaxPageCount != 0  && this.selectedMaxPageCount != this.filteredModel?.filters.maxPageCount)
      || (this.selectedMinPageCount != 0  && this.selectedMinPageCount != this.filteredModel?.filters.minPageCount)

  }

  updateContent(): void {
    const currentCategoryId = this.route.snapshot.params['id'] as number;
    this.http.get<FilteredBooks>(`${apiBase}/books/category/${currentCategoryId}`).subscribe(data => {
      this.books = data.books.entities;
      this.filteredModel = data;
      this.selectedMaxPageCount = this.filteredModel.filters.maxPageCount;
      this.selectedMinPageCount = this.filteredModel.filters.minPageCount;
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
    this.hasCheckboxesChanged = true;
    if(event.checked)
      this.selectedWriterIds.push(item.id);
    else
      this.selectedWriterIds = this.selectedWriterIds.filter(selectedItem => selectedItem != item.id);
  }

  public onCategoryCheckBox(event: MatCheckboxChange, item: {id: number, name: string}): void {
    this.hasCheckboxesChanged = true;
    if(event.checked)
      this.selectedCategoryIds.push(item.id);
    else
      this.selectedCategoryIds = this.selectedCategoryIds.filter(selectedItem => selectedItem != item.id);
  }

  public onPublisherCheckBox(event: MatCheckboxChange, item: {id: number, name: string}): void {
    this.hasCheckboxesChanged = true;
    if(event.checked)
      this.selectedPublisherIds.push(item.id);
    else
      this.selectedPublisherIds = this.selectedPublisherIds.filter(selectedItem => selectedItem != item.id);
  }

  public onApplyFilters(): void{
    this.hasCheckboxesChanged = false
    if(this.selectedCategoryIds.length == 0) {
      this.selectedCategoryIds.push(this.currentCategory!.id!)
    }
    const filters = {
      language: [],
      writerIds: this.selectedWriterIds,
      categoryIds: this.selectedCategoryIds.length == 0
        ? [this.currentCategory!.id!]
        : this.selectedCategoryIds,
      publisherIds: this.selectedPublisherIds,
      maxPageCount: this.selectedMaxPageCount,
      minPageCount : this.selectedMinPageCount
    }
    console.log(this.currentCategory)
    this.http.post<any>(`${apiBase}/books/filtered`, filters).subscribe(data => {
      this.books = data.entities;
    })
  }

  public onOpenBook(book: Book): void{
    this.router.navigate([`books/${book.id}`]);
  }

  public onNewBook(): void{
    const dialogRef = this.matDialog.open(NewBookDialogComponent, {});
    dialogRef.afterClosed().subscribe(data => {
      if(data) this.updateContent()
    })
  }
}
