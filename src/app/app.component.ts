import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarsComponent } from '../components/Admin/SideNavBar/navbars.component';
import { CommonModule } from '@angular/common';

  import { RegisterComponent } from '../components/Auth/register/register.component';

import { HomeComponent } from "../components/Admin/home/home.component";
import { MainComponent } from '../components/Admin/main/main.component';
import { TopnavbarComponent } from '../components/Admin/topnavbar/topnavbar.component';
import { BranchesComponent } from '../components/Admin/Settings/branches/branches.component';
import { AddBranchComponent } from '../components/Admin/Settings/branches/add-branch/add-branch.component';
import { SharedNavbarComponent } from "../components/shared-navbar/shared-navbar.component";
import { FooterComponent } from "../components/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarsComponent, CommonModule, HomeComponent, MainComponent, TopnavbarComponent, BranchesComponent  ,  RegisterComponent,
, AddBranchComponent, SharedNavbarComponent, FooterComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public title = 'ShippingSystemConsumer';
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);
  marginLeft: any;

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);

    // Hide spinner after page loads
    setTimeout(() => {
      const spinner = document.getElementById('spinner');
      if (spinner) {
        spinner.classList.remove('show');
      }
    }, 1000);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
