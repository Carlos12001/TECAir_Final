import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userLogged } from 'src/app/models/user-logged.model';

@Component({
  selector: 'app-display-flies',
  templateUrl: './display-flies.component.html',
  styleUrls: ['./display-flies.component.css'],
})
export class DisplayFliesComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (userLogged.fname == '') {
      this.router.navigate(['/display-sign-in']);
    } else {
      console.log('Ingreso');
    }
  }
}
