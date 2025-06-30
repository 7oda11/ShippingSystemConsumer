import { Component, HostListener, signal } from '@angular/core';
import { NavbarsComponent } from '../SideNavBar/navbars.component';
import { TopnavbarComponent } from '../topnavbar/topnavbar.component';
import { MainComponent } from '../main/main.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarsComponent, MainComponent, RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
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
