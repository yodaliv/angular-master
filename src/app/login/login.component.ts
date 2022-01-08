import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    console.log("Login constructor");
  }

  ngOnInit() {
    console.log("Login OnInit");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          this.loading = false;
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.authenticationService.currentUser = data;
          this.router.navigate(['/owner']);
        },
        error => {
          this.loading = false;
          this.router.navigate(['/']);
        },
      );
  }
}
