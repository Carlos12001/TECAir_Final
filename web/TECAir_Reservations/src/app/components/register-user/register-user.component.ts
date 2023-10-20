import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type UserType = 'normal' | 'student' | 'admin' | null;

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  userForm!: FormGroup;
  selectedUserType: UserType = null;

  constructor(private fb: FormBuilder) {}

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

  resetSelection(): void {
    this.selectedUserType = null;
  }

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

    console.log(UserLogged);
  }
}
