import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfilePageComponent} from "../../user-profile/profile-page/profile-page.component";
import {HttpClient} from "@angular/common/http";
import configData from "../../../../assets/config.json";

let apiBase = configData.apiBase

@Component({
  selector: 'app-create-shelf-dialog',
  templateUrl: './create-shelf-dialog.component.html',
  styleUrls: ['./create-shelf-dialog.component.sass']
})
export class CreateShelfDialogComponent implements OnInit {
  picture: string = '';
  isShelfCreated: boolean = false;
  form = new FormGroup({
    title: new FormControl("", Validators.minLength(1)),
    formattedAddress: new FormControl("", Validators.minLength(1)),
    longitude: new FormControl(0),
    latitude: new FormControl(0)
  });
  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    private http: HttpClient
  ) { }

  public isTitleInvalid : boolean = true
  public isFormattedAddressInvalid : boolean = true
  public isLongitudeInvalid : boolean = false
  public isLatitudeInvalid : boolean = false
  public isPhotoInvalid : boolean = false
  public isButtonDisabled() : boolean{
    return this.isTitleInvalid
      || this.isFormattedAddressInvalid
      || this.isLongitudeInvalid
      || this.isLatitudeInvalid
      || this.isPhotoInvalid;
  }

  ngOnInit(): void {
    this.form.controls.title.valueChanges.subscribe(data => {
      if(data?.toString().length === 0){
        this.form.controls.title.setErrors([]);
        this.isTitleInvalid = true;
      } else {
        this.isTitleInvalid = false;
      }
    });
    this.form.controls.formattedAddress.valueChanges.subscribe(data => {
      if(data?.toString().length === 0){
        this.form.controls.formattedAddress.setErrors([]);
        this.isFormattedAddressInvalid = true;
      } else {
        this.isFormattedAddressInvalid = false;
      }
    });
    this.form.controls.latitude.valueChanges.subscribe(data => {
      if(!data || Math.abs(data) > 180){
        this.form.controls.latitude.setErrors([]);
        this.isLatitudeInvalid = true;
      } else {
        this.isLatitudeInvalid = false;
      }
    });
    this.form.controls.longitude.valueChanges.subscribe(data => {
      if(!data || Math.abs(data) > 180){
        this.form.controls.longitude.setErrors([]);
        this.isLongitudeInvalid = true;
      } else {
        this.isLongitudeInvalid = false;
      }
    });
  }

  handleFileChange(event: Event) {
    this.isPhotoInvalid = true;
    const file = (event.target as HTMLInputElement).files![0];
    let testData:FormData = new FormData();
    testData.append('file', file, file.name);
    this.http.post(`${apiBase}/images/editingshelf`, testData).subscribe((response : any) => {
      this.isPhotoInvalid = false;
      this.picture = response.imageUrl;
    });
  }

  onNoClick(): void {
    this.isShelfCreated = false;
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    if(!this.isShelfCreated){
      this.http.delete(`${apiBase}/images/editingshelf`).subscribe(response => { });
    }
  }
  onSave(): void{
    const newShelf = {
      title: this.form.controls.title.value!,
      formattedAddress: this.form.controls.formattedAddress.value!,
      longitude: this.form.controls.longitude.value!,
      latitude: this.form.controls.latitude.value!,
      pictureLink: this.picture
    }
    this.http.post(`${apiBase}/shelves`, newShelf).subscribe(response => {
      this.isShelfCreated = true;
      this.dialogRef.close(true);
    });
  }
}
