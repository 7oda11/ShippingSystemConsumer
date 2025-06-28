import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  imports: [RouterModule,CommonModule ],
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.css'
})
export class TopnavbarComponent {
//  @Input() isLeftSidebarCollapsed!: boolean;
//   @Input() screenWidth!: number;
// @Input() isLeftSidebarCollapsed: boolean = false;
 @Input() isLeftSidebarCollapsed!: boolean;

}
