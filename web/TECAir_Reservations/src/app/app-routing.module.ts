import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: HomeComponent },
  { path: 'prices', component: HomeComponent },
  { path: 'search-flights', component: HomeComponent },
  { path: 'seat-selection', component: HomeComponent },
  { path: 'checkout', component: HomeComponent },
  { path: 'confirmation', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
