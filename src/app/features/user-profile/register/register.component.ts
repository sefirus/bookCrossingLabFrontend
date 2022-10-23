import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HeaderComponent} from "../../../layout/header/header.component";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl("", Validators.minLength(1)),
    password: new FormControl("", Validators.minLength(1)),
    repeatPassword: new FormControl("", Validators.minLength(1)),
    firstName: new FormControl("", Validators.minLength(1)),
    lastName: new FormControl(""),
    birthDate: new FormControl("")
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
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : {email: string, password: string},
    public dialogRef: MatDialogRef<HeaderComponent>,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
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
    this.form.controls.password.valueChanges.subscribe(data => {
      if(data?.toString().length === 0){
        this.form.controls.password.setErrors([]);
        this.isPasswordInvalid = true;
      } else {
        this.isPasswordInvalid = false;
      }
    });
    this.form.controls.repeatPassword.valueChanges.subscribe(data => {
      if(data?.toString().length === 0 || data?.toString() != this.form.controls.password.value){
        this.form.controls.repeatPassword.setErrors([]);
        this.isRepeatPasswordInvalid = true;
      } else {
        this.isRepeatPasswordInvalid = false;
      }
    });
    this.form.controls.birthDate.valueChanges.subscribe(data => {
      if(data?.toString().length === 0){
        this.form.controls.birthDate.setErrors([]);
      }
    });

  }

  onRegister(): void{
    this.dialogRef.close(true)
    this.auth.register(this.form.controls.email.value!,
      this.form.controls.password.value!,
      this.form.controls.firstName.value!,
      this.form.controls.lastName.value!,
      new Date(this.form.controls.birthDate.value!).toISOString())
      .subscribe(data => {
          this.dialogRef.close(true)
        },
        error => {
          this.form.controls.email.setErrors([]);
          this.form.controls.password.setErrors([]);
          this.form.controls.repeatPassword.setErrors([]);
        })
  }

}
