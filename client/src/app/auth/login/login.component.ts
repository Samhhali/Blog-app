import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../auth-helper-function';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;
  // username = '';
  // password = '';
  // isLoadingResults = false;
  // matcher = new MyErrorStateMatcher();

  loginForm = new FormGroup({});
  
  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService) { }

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        'username' : [null, Validators.required],
        'password' : [null, Validators.required]
      });
    }
  //function to submit the login form.
  onFormSubmit(form: NgForm) {
    this.authService.login(form)
      .subscribe(res => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['admin']);
        }
      }, (err) => {
        console.log(err);
      });
  }
  //function to go to the Register page.
  register() {
    this.router.navigate(['register']);
  }
  
}
