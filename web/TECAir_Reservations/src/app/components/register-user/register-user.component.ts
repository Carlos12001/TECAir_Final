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
export class RegisterUserComponent implements OnInit {
  userForm!: FormGroup;
  selectedUserType: UserType = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {}

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
  }
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
