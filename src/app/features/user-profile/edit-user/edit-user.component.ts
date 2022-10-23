import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/User";
import {ProfilePageComponent} from "../profile-page/profile-page.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";

let apiBase = configData.apiBase

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
  profilePicture: string = '';

  form = new FormGroup({
    email: new FormControl("", Validators.minLength(1)),
    firstName: new FormControl("", Validators.minLength(1)),
    lastName: new FormControl(""),
    birthDate: new FormControl()
  });

  public isPasswordInvalid : boolean = true
  public isRepeatPasswordInvalid : boolean = true
  public isFirstNameInvalid : boolean = true
  public isLastNameInvalid : boolean = true
  public isEmailInvalid : boolean = true
  public isButtonDisabled() : boolean{ return this.isPasswordInvalid
    || this.isRepeatPasswordInvalid
    || this.isFirstNameInvalid
    || this.isEmailInvalid;}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : User,
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    let testData:FormData = new FormData();
    testData.append('file_upload', file, file.name);
    this.http.post(`${apiBase}/images/editinguser`, testData).subscribe(response => {
      console.log(response);
    });  }
}
