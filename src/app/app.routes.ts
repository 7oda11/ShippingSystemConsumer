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

export const routes: Routes = [
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
];
