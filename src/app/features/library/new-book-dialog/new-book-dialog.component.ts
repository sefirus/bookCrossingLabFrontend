import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HeaderComponent} from "../../../layout/header/header.component";
import {SearchBook} from "../../../core/models/SearchBook";
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";
import {
  MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from "@angular/material/select";

let apiBase = configData.apiBase

@Component({
  selector: 'app-new-book-dialog',
  templateUrl: './new-book-dialog.component.html',
  styleUrls: ['./new-book-dialog.component.sass'],
  providers: [
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  ]
})
export class NewBookDialogComponent implements OnInit {

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : {},
    public dialogRef: MatDialogRef<HeaderComponent>,
    private http: HttpClient
  ) { }

  form = new FormGroup({
    apiSearch: new FormControl("", Validators.minLength(1)),
  });
  options: string[] = ['One', 'Two', 'Three'];
  apiBooks?: SearchBook[];
  selectedBook?: SearchBook;

  ngOnInit() {
    this.form.controls.apiSearch.valueChanges.subscribe(data => {
      if((data?.length ?? 0) > 2)
      this.http.get<SearchBook[]>(`${apiBase}/books?request=${data}`)
        .subscribe(value => {
          this.apiBooks = value;
        })
    })
  }
   onSubmit(): void {
    this.http.post(`${apiBase}/books`, this.selectedBook)
      .subscribe(data => {
        this.dialogRef.close(true)
      },
        error => {
          this.dialogRef.close(false)
        })
   }

  isButtonDisabled(): boolean{
    return !this.selectedBook;
  }

  onSelect(event: MatAutocompleteSelectedEvent): void{
    this.selectedBook = this.apiBooks?.filter(b => b.title == event.option.value)[0];
  }
}
