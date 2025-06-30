import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbars',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbars.component.html',
  styleUrl: './navbars.component.css',
})
export class NavbarsComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  submenuState: { [index: number]: boolean } = {};

  isSubmenuOpen(index: number): boolean {
    return this.submenuState[index];
  }
  items = [
    {
      routeLink: 'AdminDashboard',
      icon: 'fal fa-home',
      label: 'Home',
    },
    {
      routeLink: 'products',
      icon: 'fal fa-box-open',
      label: 'Products',
    },
    {
      
      icon: 'fa fa-users',
      label: 'Users',
      children: [
        { label: 'Vendor', routeLink: '/users/vendors', icon: 'fa fa-users' },
        { label: 'Employees', routeLink: '/users/employees', icon: 'fa fa-user-shield' },
        { label: 'Deliveries', routeLink: '/users/deliveries', icon: 'fa fa-truck' },
      ]
    },

    {
      label: 'Settings',
      icon: 'fa fa-cog',


      children: [
        {
          label: 'Branches',
          routeLink: '/dashboard/branches',
          icon: 'fa fa-code-branch',
        },
        { label: 'Cities', routeLink: '/dashboard/cities', icon: 'fa fa-city' },
        {
          label: 'Governments',
          routeLink: '/dashboard/government',
          icon: 'fa fa-landmark',
        },
        {
          label: 'Weight Settings',
          routeLink: '/dashboard/weightSetting',
          icon: 'fa fa-weight',
        },
      ],
    },
  ];
  toggleSubmenu(index: number): void {
    if (this.items[index]?.children) {
      this.submenuState[index] = !this.submenuState[index];
    }
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
