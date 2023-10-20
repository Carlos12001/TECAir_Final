import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogged, userLogged } from 'src/app/models/user-logged.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    userLogged.email = this.signInForm.value.email;
    userLogged.upassword = this.signInForm.value.password;
    userLogged.fname = 'Pedro';
    userLogged.mname = 'Perez';
    userLogged.lname1 = 'Perez';
    userLogged.lname2 = 'Perez';
    userLogged.studentid = '123456789';
    userLogged.unumber = '123456789';
    userLogged.miles = 0;
    if (userLogged.fname != '') {
      this.router.navigate(['/home']);
    }
    console.log(this.signInForm.value);
  }
}
