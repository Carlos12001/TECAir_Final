import { Component, OnInit } from '@angular/core';
import { UserLogged, userLogged } from 'src/app/models/user-logged.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLogged: UserLogged = userLogged;
  ngOnInit(): void {
    this.userLogged = userLogged;
  }
}
