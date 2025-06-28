import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shared-navbar.component.html',
  styleUrls: ['./shared-navbar.component.css']
})
export class SharedNavbarComponent {
  
} 