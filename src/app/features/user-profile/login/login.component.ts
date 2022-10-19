import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../core/services/auth.service";
import {HeaderComponent} from "../../../layout/header/header.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : {email: string, password: string},
    private auth : AuthService,
    public dialogRef: MatDialogRef<HeaderComponent>
  ) { }

  ngOnInit(): void {
    this.form.get("email")?.valueChanges.subscribe(data => {
      this.isEmailInvalid = this.form.controls.email.invalid;
      if(data?.toString().length === 0){
        this.form.controls.email.setErrors([]);
      }
    });
    this.form.get("password")?.valueChanges.subscribe(data => {
      this.isPasswordInvalid = this.form.controls.password.invalid;
      if(data?.toString().length === 0){
        this.form.controls.password.setErrors([]);
      }
    })
  }

  form = new FormGroup({
    email: new FormControl("", Validators.minLength(1)),
    password: new FormControl("", Validators.minLength(1)),
  });

  public isEmailInvalid : boolean = true;
  public isPasswordInvalid : boolean = true;

  onLogin() : void{
    this.data.email = this.form.value.email!;
    this.data.password = this.form.value.password!;
    this.auth.login(this.data.password, this.data.email).subscribe(
      data => {
        this.dialogRef.close(true)
      },
      error => {
        this.form.controls.email.setErrors([]);
        this.form.controls.password.setErrors([]);
      });
  }
}
