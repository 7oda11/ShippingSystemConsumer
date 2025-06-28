import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarsComponent } from '../components/navbars/navbars.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { MainComponent } from '../components/main/main.component';
import { RegisterComponent } from '../components/Auth/register/register.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarsComponent,
    CommonModule,
    HomeComponent,
    MainComponent,
    RegisterComponent,
    RouterModule,
  ],
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
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
