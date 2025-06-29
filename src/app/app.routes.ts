import { HomeComponent as adminHome } from './../components/Admin/home/home.component';
import { Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ServiceComponent } from '../components/service/service.component';

import { BranchesComponent } from '../components/Admin/Settings/branches/branches.component';
import { CitiesComponent } from '../components/Admin/Settings/cities/cities.component';
import { AddBranchComponent } from '../components/Admin/Settings/branches/add-branch/add-branch.component';
import { GovernmentsComponent } from '../components/Admin/Settings/governments/governments.component';
import { WeightSettingsComponent } from '../components/Admin/Settings/weight-settings/weight-settings.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/Auth/register/register.component';
import { LoginComponent } from '../components/Auth/login/login.component';
import { AddCityComponent } from '../components/Admin/Settings/cities/add-city/add-city.component';
import { AddGovernmentComponent } from '../components/Admin/Settings/governments/add-government/add-government.component';
import { EditGovernmentComponent } from '../components/Admin/Settings/governments/edit-government/edit-government.component';
import { GovernmentDetailsComponent } from '../components/Admin/Settings/governments/government-details/government-details.component';


export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'contact', component: ContactComponent },

  // Admin Settings Routes
  { path: 'AdminDashboard', component: adminHome },
  { path: 'settings/branches', component: BranchesComponent },
  { path: 'settings/cities', component: CitiesComponent },
  { path: 'settings/branches/add-branch', component: AddBranchComponent },
  { path: 'settings/government', component: GovernmentsComponent },
  { path: 'settings/weightSetting', component: WeightSettingsComponent },
  { path: 'settings/cities/add-city', component: AddCityComponent },
  

  {path:'settings/government/details/:id',component:GovernmentDetailsComponent},
  {path:'settings/government/add-government', component:AddGovernmentComponent},
  {path:'settings/government/edit/:id', 
    loadComponent: ()=>import('../components/Admin/Settings/governments/edit-government/edit-government.component')
    .then(g=>g.EditGovernmentComponent)},

  { path: 'settings/weightSetting', component: WeightSettingsComponent }
];
