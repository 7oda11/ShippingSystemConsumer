import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { SharedNavbarComponent } from '../../shared-navbar/shared-navbar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-base',
  imports: [
    FooterComponent,
    CommonModule,
    SharedNavbarComponent,
    RouterModule,
    RouterOutlet,
    FormsModule,
    HomeComponent,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent {}
