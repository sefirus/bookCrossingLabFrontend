import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
export class EditUserComponent implements OnInit, OnDestroy {
  profilePicture: string = '';
  isUserUpdated = false;

  form = new FormGroup({
    email: new FormControl("", Validators.minLength(1)),
    firstName: new FormControl("", Validators.minLength(1)),
    lastName: new FormControl(""),
    birthDate: new FormControl()
  });

  public isFirstNameInvalid : boolean = false
  public isLastNameInvalid : boolean = false
  public isEmailInvalid : boolean = false
  public isPhotoInvalid : boolean = false
  public isButtonDisabled() : boolean{
    return this.isFirstNameInvalid
      || this.isLastNameInvalid
      || this.isEmailInvalid
      || this.isPhotoInvalid;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : User,
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.data);
    this.profilePicture = this.data.profilePicture;

    this.form.controls.email.valueChanges.subscribe(data => {
      if(data?.toString().length === 0){
        this.form.controls.email.setErrors([]);
        this.isEmailInvalid = true;
      } else {
        this.isEmailInvalid = false;
      }
    });
    this.form.controls.firstName.valueChanges.subscribe(data => {
      if(data?.toString().length === 0){
        this.form.controls.firstName.setErrors([]);
        this.isFirstNameInvalid = true;
      } else {
        this.isFirstNameInvalid = false;
      }
    });
    this.form.controls.lastName.valueChanges.subscribe(data => {
      if(data?.toString().length === 0){
        this.form.controls.lastName.setErrors([]);
        this.isLastNameInvalid = true;
      } else {
        this.isLastNameInvalid = false;
      }
    });
  }

  handleFileChange(event: Event) {
    this.isPhotoInvalid = true;
    const file = (event.target as HTMLInputElement).files![0];
    let testData:FormData = new FormData();
    testData.append('file', file, file.name);
    this.http.post(`${apiBase}/images/editinguser`, testData).subscribe((response : any) => {
      this.isPhotoInvalid = false;
      this.profilePicture = response.imageUrl;
    });
  }

  onNoClick(): void {
    this.isUserUpdated = false;
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    if(!this.isUserUpdated){
      this.http.delete(`${apiBase}/images/editinguser`).subscribe(response => { });
    }
  }

  onSave(): void{
    const updatedUser = {
      id: this.data.id,
      email: this.form.controls.email.value!,
      firstName: this.form.controls.firstName.value!,
      lastName: this.form.controls.lastName.value!,
      birthDate: new Date(this.form.controls.birthDate.value!).toISOString(),
      profilePicture: this.profilePicture
    }
    this.http.put(`${apiBase}/users`, updatedUser).subscribe(response => {
      this.isUserUpdated = true;
      this.dialogRef.close(true);
    },
      error => {
        this.form.controls.email.setErrors([]);
        this.form.controls.firstName.setErrors([]);
        this.form.controls.lastName.setErrors([]);
        this.form.controls.birthDate.setErrors([]);
      })

  }
}
