import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarsComponent } from '../components/Admin/SideNavBar/navbars.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "../components/Admin/home/home.component";
import { MainComponent } from '../components/Admin/main/main.component';
import { TopnavbarComponent } from '../components/Admin/topnavbar/topnavbar.component';
import { BranchesComponent } from '../components/Admin/Settings/branches/branches.component';
import { AddBranchComponent } from '../components/Admin/Settings/branches/add-branch/add-branch.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarsComponent, CommonModule, HomeComponent, MainComponent,TopnavbarComponent,BranchesComponent,AddBranchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}