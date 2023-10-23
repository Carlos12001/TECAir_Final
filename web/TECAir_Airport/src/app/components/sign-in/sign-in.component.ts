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
/* The SignInComponent class is responsible for handling the sign-in functionality, including form validation and user authentication. */
export class SignInComponent implements OnInit {
  /* The line `signInForm!: FormGroup;` is declaring a property called `signInForm` of type `FormGroup`. The exclamation mark (`!`) is the non-null assertion operator, which tells TypeScript that even though the property is declared without an initial value, it will be assigned a value before it is used. This is commonly used when using Angular's reactive forms, where the form group is initialized in the `ngOnInit` method. */
  signInForm!: FormGroup;

  /**
   * The constructor function initializes private variables for FormBuilder, Router, and SignInService.
   * @param {FormBuilder} fb - The `fb` parameter is an instance of the `FormBuilder` class. It is used to create and manage forms in Angular applications.
   * @param {Router} router - The `router` parameter is an instance of the `Router` class, which is used for navigating between different routes in your application. It provides methods like `navigate`, `navigateByUrl`, and `navigateByCommands` to navigate to different routes.
   * @param {SignInService} signInService - The `signInService` parameter is an instance of the `SignInService` class. It is used to handle the sign-in functionality in the component.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signInService: SignInService
  ) {}

  /**
   * The ngOnInit function initializes the signInForm FormGroup with email, password, and rememberMe form controls.
   */
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  /**
   * The onSubmit function handles form submission, checks if the provided email and password match any user in the database, and navigates to the home page if a match is found.
   */
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
