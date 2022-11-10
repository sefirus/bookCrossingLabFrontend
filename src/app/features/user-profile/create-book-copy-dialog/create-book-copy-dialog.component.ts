import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from "@angular/material/select";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HeaderComponent} from "../../../layout/header/header.component";
import {HttpClient} from "@angular/common/http";
import {SearchBook} from "../../../core/models/SearchBook";
import configData from "../../../../assets/config.json";

let apiBase = configData.apiBase

@Component({
  selector: 'app-create-book-copy-dialog',
  templateUrl: './create-book-copy-dialog.component.html',
  styleUrls: ['./create-book-copy-dialog.component.sass'],
  providers: [
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  ]
})
export class CreateBookCopyDialogComponent implements OnInit {
  form = new FormGroup({
    apiSearch: new FormControl("", Validators.minLength(1)),
  });
  apiBooks?: SearchBook[];
  selectedBook?: SearchBook;
  bookCopyPicture?: string;
  isPhotoInvalid: boolean = false;

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : {},
    public dialogRef: MatDialogRef<HeaderComponent>,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.form.controls.apiSearch.valueChanges.subscribe(data => {
      if((data?.length ?? 0) > 2)
        this.http.get<SearchBook[]>(`${apiBase}/books?request=${data}`)
          .subscribe(value => {
            this.apiBooks = value;
          })
    })
  }

  isButtonDisabled(): boolean{
    return !this.selectedBook || this.isPhotoInvalid;
  }

  onSelect(event: MatAutocompleteSelectedEvent): void{
    this.selectedBook = this.apiBooks?.filter(b => b.title == event.option.value)[0];
  }

  onSubmit(): void {
    const newBookCopy = {
      baseBook: this.selectedBook,
      image: this.bookCopyPicture
    }
    this.http.post(`${apiBase}/bookcopies`, newBookCopy)
      .subscribe(data => {
          this.dialogRef.close(true)
        },
        error => {
          this.dialogRef.close(false)
        })
  }

  handleFileChange(event: Event) {
    this.isPhotoInvalid = true;
    const file = (event.target as HTMLInputElement).files![0];
    let testData:FormData = new FormData();
    testData.append('file', file, file.name);
    this.http.post(`${apiBase}/images/editingbookcopy`, testData).subscribe((response : any) => {
      this.isPhotoInvalid = false;
      this.bookCopyPicture = response.imageUrl;
    });
  }

}
