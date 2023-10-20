import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogged, userLogged } from 'src/app/models/user-logged.model';
import { SignInService } from 'src/app/services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signInService: SignInService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    const emailInput = this.signInForm.value.email;
    const passwordInput = this.signInForm.value.password;
    console.log(emailInput, passwordInput);

    this.signInService.getUsers().subscribe({
      next: (data: UserLogged[]) => {
        // Buscamos al usuario con el email y password proporcionados
        const userFound = data.find(
          (user) =>
            user.email === emailInput && user.upassword === passwordInput
        );

        if (userFound) {
          // Si el usuario se encuentra, asignamos sus valores a userLogged
          userLogged.email = userFound.email;
          userLogged.upassword = userFound.upassword;
          userLogged.fname = userFound.fname;
          userLogged.mname = userFound.mname;
          userLogged.lname1 = userFound.lname1;
          userLogged.lname2 = userFound.lname2;

          console.log(userLogged);
          // Navegamos a la página de inicio
          this.router.navigate(['/home']);
        } else {
          // Si no encontramos al usuario, podemos mostrar un mensaje de error.
          console.error('Invalid email or password');
          window.alert('Invalid email or password');
          userLogged.email = '';
          userLogged.upassword = '';
          userLogged.fname = '';
          userLogged.mname = '';
          userLogged.lname1 = '';
          userLogged.lname2 = '';
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        userLogged.email = '';
        userLogged.upassword = '';
        userLogged.fname = '';
        userLogged.mname = '';
        userLogged.lname1 = '';
        userLogged.lname2 = '';
        if (emailInput === 'pedrog@gmail.com' && passwordInput === 'yes') {
          userLogged.fname = 'Pedro';
          userLogged.unumber = '123456';
          userLogged.mname = 'Garcia';
          userLogged.lname1 = 'Rodriguez';
          userLogged.lname2 = 'Perez';
          userLogged.email = 'pedrogr@gmail.com';
          userLogged.upassword = 'yes';
          console.log(userLogged);
          this.router.navigate(['/home']);
        }
      },
      complete: () => {
        console.log('Finished users fetched');
      },
    });
  }
}
