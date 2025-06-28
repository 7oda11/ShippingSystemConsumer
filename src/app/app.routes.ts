import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/Auth/register/register.component';
import { LoginComponent } from '../components/Auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];
