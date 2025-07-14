import { DeliverymanOrdersComponent } from './../components/Admin/DeliveryManOrder/deliveryman-orders/deliveryman-orders.component';
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
import { VendorOrdersComponent } from '../components/Admin/VendorOrders/vendor-orders/vendor-orders.component';
import { roleguardGuard } from '../../guards/roleguard.guard';
import { UnauthorizedComponent } from '../components/Admin/Unauthorized/unauthorized/unauthorized.component';
import { AssistantChatComponent } from '../components/Admin/Settings/assistant-chat/assistant-chat.component';

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

  //Unauthorized
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Admin Settings Routes

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      //order
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
        // {role: 'Employee'},
      },
      { path: 'add-order', component: AddOrderComponent },

      { path: '', redirectTo: 'adminhome', pathMatch: 'full' },
      { path: 'adminhome', component: AdminHomeComponent },
      {
        path: 'deliverymanorders',
        component: DeliverymanOrdersComponent,
        // canActivate:[deliverymanroleguardGuard]
        canActivate: [roleguardGuard],
        data: { roles: ['DeliveryMan'] },
      },
      {
        path: 'vendororders',
        component: VendorOrdersComponent,
        // canActivate:[vendorroleguardGuard]
        canActivate: [roleguardGuard],
        data: { roles: ['Vendor'] },
      },

      {
        path: 'branches',
        component: BranchesComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'branches/add-branch',
        component: AddBranchComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'cities',
        component: CitiesComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'cities/add-city',
        component: AddCityComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'government',
        component: GovernmentsComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'government/add-government',
        component: AddGovernmentComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'status',
        component: StatusComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'status/add-status',
        component: AddStatusComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'shipping-type',
        component: ShippingTypeComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'shipping-type/add-shipping',
        component: AddShippingTypeComponent,
      },
      {
        path: 'government/details/:id',
        component: GovernmentDetailsComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },

      {
        path: 'government/add-government',
        component: AddGovernmentComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'government/edit/:id',

        loadComponent: () =>
          import(
            '../components/Admin/Settings/governments/edit-government/edit-government.component'
          ).then((g) => g.EditGovernmentComponent),
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'weightSetting',
        component: WeightSettingsComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'weightsetting/add-weightsetting',
        component: AddWeightSettingComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },

      {
        path: 'government/add-government',
        component: AddGovernmentComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      { path: 'chat', component: AssistantChatComponent },

      //user
      {
        path: 'vendors',
        component: VendorComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'deliveries',
        component: DeliveriesComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'employees/add-employee',
        component: AddEmployeeComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },

      {
        path: 'deliveries/add-delivery',
        component: AddDeliveryComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'deliveries/edit-delivery/:id',
        component: EditDeliveryComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'government/edit/:id',

        loadComponent: () =>
          import(
            '../components/Admin/Settings/governments/edit-government/edit-government.component'
          ).then((g) => g.EditGovernmentComponent),
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },

      {
        path: 'weightSetting',
        component: WeightSettingsComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'vendors',
        component: VendorComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'vendors/add-vendor',
        component: AddVendorComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'vendors/edit-vendor/:id',
        component: EditVendorComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },

      { path: '', redirectTo: 'branches', pathMatch: 'full' },

      //vendor
      {
        path: 'vendors',
        component: VendorComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'vendors/add-vendor',
        component: AddVendorComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },
      {
        path: 'vendors/edit-vendor/:id',
        component: EditVendorComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },

      //order
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [roleguardGuard],
        data: { roles: ['Admin', 'Employee'] },
      },

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
