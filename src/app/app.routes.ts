import { Routes } from '@angular/router';
import { HomeComponent } from '../components/Admin/home/home.component';
import { BranchesComponent } from '../components/Admin/Settings/branches/branches.component';
import { CitiesComponent } from '../components/Admin/Settings/cities/cities.component';
import { AddBranchComponent } from '../components/Admin/Settings/branches/add-branch/add-branch.component';
import { GovernmentsComponent } from '../components/Admin/Settings/governments/governments.component';
import { WeightSettingsComponent } from '../components/Admin/Settings/weight-settings/weight-settings.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'AdminDashboard', component: HomeComponent },
    { path: 'settings/branches', component: BranchesComponent },
    { path: 'settings/cities', component: CitiesComponent },
    { path: 'settings/branches/add-branch', component: AddBranchComponent },
    { path: 'settings/government', component: GovernmentsComponent },
    { path: 'settings/weightSetting', component: WeightSettingsComponent },
     

];
