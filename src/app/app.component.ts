import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarsComponent } from '../components/Admin/SideNavBar/navbars.component';
import { RegisterComponent } from '../components/Auth/register/register.component';
import { HomeComponent } from '../components/Admin/home/home.component';
import { MainComponent } from '../components/Admin/main/main.component';
import { TopnavbarComponent } from '../components/Admin/topnavbar/topnavbar.component';
import { BranchesComponent } from '../components/Admin/Settings/branches/branches.component';
import { AddBranchComponent } from '../components/Admin/Settings/branches/add-branch/add-branch.component';
import { SharedNavbarComponent } from '../components/shared-navbar/shared-navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CitiesComponent } from '../components/Admin/Settings/cities/cities.component';
import { AddCityComponent } from '../components/Admin/Settings/cities/add-city/add-city.component';
import { VendorComponent } from '../components/Users/vendor/vendor.component';
import { EmployeesComponent } from '../components/Users/employees/employees.component';
import { DeliveriesComponent } from '../components/Users/deliveries/deliveries.component';
import { AddOrderComponent } from '../components/Admin/Order/add-order/add-order.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [

    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
   

    NavbarsComponent,
    RegisterComponent,
    HomeComponent,
    MainComponent,
    TopnavbarComponent,
    BranchesComponent,
    AddBranchComponent,
    SharedNavbarComponent,
    FooterComponent,
    AddCityComponent,

    VendorComponent,
    EmployeesComponent,
    DeliveriesComponent,
    AddOrderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title = 'ShippingSystemConsumer';
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);

    setTimeout(() => {
      const spinner = document.getElementById('spinner');
      if (spinner) {
        spinner.classList.remove('show');
      }
    }, 1000);
  }

  changeIsLeftSidebarCollapsed(isCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isCollapsed);
  }
}
