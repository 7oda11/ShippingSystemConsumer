import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbars',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbars.component.html',
  styleUrl: './navbars.component.css',
})
export class NavbarsComponent implements OnInit {
  ngOnInit(): void {
   this.role = localStorage.getItem('role') ;
  }
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  submenuState: { [index: number]: boolean } = {};
  role:string | null = null;

  isSubmenuOpen(index: number): boolean {
    return this.submenuState[index];
  }
  items = [
    {
      routeLink: '/dashboard/adminhome',
      icon: 'fal fa-home',
      label: 'Home',
      visibleFor: ['Admin','Employee', 'Vendor', 'DeliveryMan'],
    
    },
    {
      
      icon: 'fal fa-box-open',
      label: 'Order Setting',
       children: [
        { label: 'Orders', routeLink: '/dashboard/orders', icon: 'fa fa-shopping-cart' },
        { label: 'Add order', routeLink: '/dashboard/add-order', icon: 'fa fa-plus' },
        
    
      ],
      visibleFor:['Admin','Employee']
    },

    {
       routeLink: '/dashboard/deliverymanorders',
      icon: 'fal fa-box-open',
      label: 'DeliveryMan Orders',
      visibleFor:['DeliveryMan'],
    },
      {
       routeLink: '/dashboard/vendororders',
      icon: 'fal fa-box-open',
      label: 'Vendor Orders',
       role: 'Vendor',
        visibleFor: ['Vendor']
    },

    {

      icon: 'fa fa-users',
      label: 'Users',
      children: [
        { label: 'Vendor', routeLink: '/dashboard/vendors', icon: 'fa fa-users' },
        { label: 'Employees', routeLink: '/dashboard/employees', icon: 'fa fa-user-shield' },
        { label: 'Deliveries', routeLink: '/dashboard/deliveries', icon: 'fa fa-truck' },

      ],
      visibleFor:['Admin','Employee']

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
        { label: 'Status', routeLink: '/dashboard/status', icon: 'fa fa-toggle-on' },
        { label: 'Shipping Type', routeLink: '/dashboard/shipping-type', icon: 'fa fa-shipping-fast' },
        { label: '', icon: '' }

      ],
      visibleFor:['Admin','Employee']

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
