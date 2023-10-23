import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogged } from 'src/app/models/user-logged.model';
import { ResgiterService as RegisterService } from 'src/app/services/register.service';

type UserType = 'normal' | 'student' | 'admin' | null;

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
/* The RegisterUserComponent class is responsible for handling user registration and form validation, including differentiating between student and admin users. */
export class RegisterUserComponent implements OnInit {
  /* `userForm!: FormGroup;` is declaring a property `userForm` of type `FormGroup`. The `!` symbol is the non-null assertion operator in TypeScript, which tells the compiler that the property will be initialized before it is used. In this case, the `userForm` property is initialized in the `ngOnInit` method of the component. */
  userForm!: FormGroup;
  /* The line `selectedUserType: UserType = null;` is declaring a property `selectedUserType` of type `UserType` and initializing it with a value of `null`. */
  selectedUserType: UserType = null;

  /**
   * The constructor function initializes private variables for FormBuilder, Router, and RegisterService.
   * @param {FormBuilder} fb - The `fb` parameter is an instance of the `FormBuilder` class. The `FormBuilder` class is a utility class provided by Angular that helps in creating and managing forms in Angular applications.
   * @param {Router} router - The `router` parameter is an instance of the `Router` class, which is used for navigating between different routes in your application. It allows you to programmatically navigate to different views or components.
   * @param {RegisterService} registerService - The `registerService` parameter is an instance of the `RegisterService` class. It is used to make HTTP requests to the server for registering a user.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {}

  /**
   * The ngOnInit function initializes a user form with various fields and validators.
   */
  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      upassword: ['', Validators.required],
      unumber: ['', Validators.required],
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname1: ['', Validators.required],
      lname2: ['', Validators.required],
      studentid: [''],
      university: [''],
      adminid: [''],
    });
  }

  /**
   * The function `selectUserType` is used to update the form validations based on the selected user type.
   * @param {UserType} type - The parameter `type` is of type `UserType`, which is an enum that represents the different types of users.
   */
  selectUserType(type: UserType) {
    this.selectedUserType = type;

    const studentIdControl = this.userForm.get('studentid');
    const universityControl = this.userForm.get('university');
    const adminIdControl = this.userForm.get('adminid');

    // Reset validations
    if (studentIdControl) {
      studentIdControl.clearValidators();
      studentIdControl.updateValueAndValidity();
    }

    if (universityControl) {
      universityControl.clearValidators();
      universityControl.updateValueAndValidity();
    }

    if (adminIdControl) {
      adminIdControl.clearValidators();
      adminIdControl.updateValueAndValidity();
    }

    if (type === 'student') {
      if (studentIdControl) {
        studentIdControl.setValidators([Validators.required]);
        studentIdControl.updateValueAndValidity();
      }

      if (universityControl) {
        universityControl.setValidators([Validators.required]);
        universityControl.updateValueAndValidity();
      }
    }

    if (type === 'admin') {
      if (adminIdControl) {
        adminIdControl.setValidators([Validators.required]);
        adminIdControl.updateValueAndValidity();
      }
    }
  }

  /**
   * The function "resetSelection" sets the value of "selectedUserType" to null.
   */
  resetSelection(): void {
    this.selectedUserType = null;
  }

  /**
   * The function onSubmit() creates an object UserLogged with properties based on the values entered in a user form, including specific properties for students and administrators.
   */
  onSubmit(): void {
    let UserLogged = {
      email: this.userForm.value.email,
      upassword: this.userForm.value.upassword,
      unumber: this.userForm.value.unumber,
      fname: this.userForm.value.fname,
      mname: this.userForm.value.mname,
      lname1: this.userForm.value.lname1,
      lname2: this.userForm.value.lname2,
      miles: 0, // asumiré que siempre es 0 por ahora
      studentid: '',
      university: '',
      adminid: '',
    };

    // Campos específicos para estudiantes
    if (this.selectedUserType === 'student') {
      UserLogged.studentid = this.userForm.value.studentid;
      UserLogged.university = this.userForm.value.university;
    }

    // Campos específicos para administradores
    if (this.selectedUserType === 'admin') {
      UserLogged.adminid = this.userForm.value.adminid;
    }
  }
  /**
   * The function `onRegister` is used to handle the registration process for a user, including validating the form data, sending the data to the server, and navigating to the sign-in page.
   */
  onRegister(): void {
    if (this.userForm.valid) {
      const sendData: UserLogged = this.userForm.value;
      if (sendData.studentid === '') {
        sendData.studentid = null;
        sendData.university = null;
        sendData.miles = null;
      }
      if (sendData.adminid === '') {
        sendData.adminid = null;
      } else {
        sendData.adminid = sendData.adminid;
      }
      this.registerService.postUserLogged(sendData).subscribe({
        next: (data: any) => {
          console.log(JSON.stringify(sendData, null, 2));
          this.router.navigate(['/display-sign-in']);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          console.log(JSON.stringify(sendData, null, 2));
          this.router.navigate(['/display-sign-in']);
        },
        complete: () => {
          console.log('Finished users fetched');
        },
      });
    }
  }
}
