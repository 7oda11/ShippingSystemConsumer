// import { HomeComponent as adminHome } from './../components/Admin/home/home.component';
import { HomeComponent } from '../components/home/home.component';
import { AdminHomeComponent } from '../components/Admin/AdminHome/AdminHome.component';
import { Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ServiceComponent } from '../components/service/service.component';

import { BranchesComponent } from '../components/Admin/Settings/branches/branches.component';
import { CitiesComponent } from '../components/Admin/Settings/cities/cities.component';
import { AddBranchComponent } from '../components/Admin/Settings/branches/add-branch/add-branch.component';
import { GovernmentsComponent } from '../components/Admin/Settings/governments/governments.component';
import { WeightSettingsComponent } from '../components/Admin/Settings/weight-settings/weight-settings.component';
import { RegisterComponent } from '../components/Auth/register/register.component';
import { LoginComponent } from '../components/Auth/login/login.component';
import { AddCityComponent } from '../components/Admin/Settings/cities/add-city/add-city.component';
import { AddGovernmentComponent } from '../components/Admin/Settings/governments/add-government/add-government.component';
import { EditGovernmentComponent } from '../components/Admin/Settings/governments/edit-government/edit-government.component';
import { GovernmentDetailsComponent } from '../components/Admin/Settings/governments/government-details/government-details.component';

import { BaseComponent } from '../components/base/base.component';
import { DashboardComponent } from '../components/Admin/dashboard/dashboard.component';

import { StatusComponent } from '../components/Admin/Settings/status/status.component';
import { AddStatusComponent } from '../components/Admin/Settings/status/add-status/add-status.component';
import { VendorComponent } from '../components/Users/vendor/vendor.component';
import { EmployeesComponent } from '../components/Users/employees/employees.component';
import { DeliveriesComponent } from '../components/Users/deliveries/deliveries.component';

import { AddWeightSettingComponent } from '../components/Admin/Settings/weight-settings/add-weight-setting/add-weight-setting.component';
import { AddEmployeeComponent } from '../components/Users/employees/add-employee/add-employee.component';
import { ShippingTypeComponent } from '../components/Admin/Settings/shipping-type/shipping-type.component';
import { AddShippingTypeComponent } from '../components/Admin/Settings/shipping-type/add-shipping-type/add-shipping-type.component';
import { OrdersComponent } from '../components/Admin/Order/orders/orders.component';

import { AddVendorComponent } from '../components/Users/vendor/add-vendor/add-vendor.component';
import { EditVendorComponent } from '../components/Users/vendor/edit-vendor/edit-vendor.component';
import { AddDeliveryComponent } from '../components/Users/deliveries/add-delivery/add-delivery.component';
import { EditDeliveryComponent } from '../components/Users/deliveries/edit-delivery/edit-delivery.component';
import { AddOrderComponent } from '../components/Admin/Order/add-order/add-order.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'base', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: BaseComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  // Admin Settings Routes

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      //order
      { path: 'orders', component: OrdersComponent },
      { path: 'add-order', component: AddOrderComponent },

      { path: '', redirectTo: 'adminhome', pathMatch: 'full' },
      { path: 'adminhome', component: AdminHomeComponent },

      { path: 'branches', component: BranchesComponent },
      { path: 'branches/add-branch', component: AddBranchComponent },
      { path: 'cities', component: CitiesComponent },
      { path: 'cities/add-city', component: AddCityComponent },
      { path: 'government', component: GovernmentsComponent },
      { path: 'government/add-government', component: AddGovernmentComponent },
      { path: 'status', component: StatusComponent },
      { path: 'status/add-status', component: AddStatusComponent },
      { path: 'shipping-type', component: ShippingTypeComponent },
      {
        path: 'shipping-type/add-shipping',
        component: AddShippingTypeComponent,
      },
      { path: 'government/details/:id', component: GovernmentDetailsComponent },

      { path: 'government/add-government', component: AddGovernmentComponent },
      {
        path: 'government/edit/:id',

        loadComponent: () =>
          import(
            '../components/Admin/Settings/governments/edit-government/edit-government.component'
          ).then((g) => g.EditGovernmentComponent),
      },
      { path: 'weightSetting', component: WeightSettingsComponent },
      {
        path: 'weightsetting/add-weightsetting',
        component: AddWeightSettingComponent,
      },

      { path: 'government/add-government', component: AddGovernmentComponent },

      //user
      { path: 'vendors', component: VendorComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'deliveries', component: DeliveriesComponent },
      { path: 'employees/add-employee', component: AddEmployeeComponent },

      { path: 'deliveries/add-delivery', component: AddDeliveryComponent },
      {
        path: 'deliveries/edit-delivery/:id',
        component: EditDeliveryComponent,
      },
      {
        path: 'government/edit/:id',

        loadComponent: () =>
          import(
            '../components/Admin/Settings/governments/edit-government/edit-government.component'
          ).then((g) => g.EditGovernmentComponent),
      },

      { path: 'weightSetting', component: WeightSettingsComponent },
      { path: 'vendors', component: VendorComponent },
      { path: 'vendors/add-vendor', component: AddVendorComponent },
      { path: 'vendors/edit-vendor/:id', component: EditVendorComponent },

      { path: '', redirectTo: 'branches', pathMatch: 'full' },

      //vendor
      { path: 'vendors', component: VendorComponent },
      { path: 'vendors/add-vendor', component: AddVendorComponent },
      { path: 'vendors/edit-vendor/:id', component: EditVendorComponent },

      { path: '', redirectTo: 'branches', pathMatch: 'full' },

      //order
      { path: 'orders', component: OrdersComponent },

      // example: { path: '', redirectTo: 'branches', pathMatch: 'full' } // optional default inside dashboard
    ],
  },

  // {
  //   path: 'settings/government/details/:id',
  //   component: GovernmentDetailsComponent,
  // },
  // {
  //   path: 'settings/government/add-government',
  //   component: AddGovernmentComponent,
  // },
  // {
  //   path: 'settings/government/edit/:id',
  //   loadComponent: () =>
  //     import(
  //       '../components/Admin/Settings/governments/edit-government/edit-government.component'
  //     ).then((g) => g.EditGovernmentComponent),
  // },

  // { path: 'settings/weightSetting', component: WeightSettingsComponent },

  // { path: 'AdminDashboard', component: adminHome },
  // { path: 'settings/branches', component: BranchesComponent },
  // { path: 'settings/cities', component: CitiesComponent },
  // { path: 'settings/branches/add-branch', component: AddBranchComponent },
  // { path: 'settings/government', component: GovernmentsComponent },
  // { path: 'settings/weightSetting', component: WeightSettingsComponent },
  // { path: 'settings/cities/add-city', component: AddCityComponent },
  // { path: 'settings/status', component: StatusComponent },
  // { path: 'settings/status/add-status', component: AddStatusComponent },

  // {
  //   path: 'settings/government/details/:id',
  //   component: GovernmentDetailsComponent,
  // },
  // {
  //   path: 'settings/government/add-government',
  //   component: AddGovernmentComponent,
  // },

  // {
  //   path: 'settings/government/edit/:id',
  //   loadComponent: () =>
  //     import(
  //       '../components/Admin/Settings/governments/edit-government/edit-government.component'
  //     ).then((g) => g.EditGovernmentComponent),
  // },

  // { path: 'settings/weightSetting', component: WeightSettingsComponent },

  //users routes
];
