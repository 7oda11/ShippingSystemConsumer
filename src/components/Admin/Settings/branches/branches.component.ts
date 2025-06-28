import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-branches',
  imports: [CommonModule,RouterLink],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent {
ngAfterViewInit() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
branches = [
  { name: 'Main Branch', phone: '+966 123456789', address: '123 King St, Riyadh' },
  { name: 'North Branch', phone: '+966 987654321', address: '456 North Ave, Jeddah' },
];

openUpdateModal(branch: any) {
  console.log('Edit', branch);
  // navigate to edit page or open modal
}

deleteBranch(branch: any) {
  console.log('Delete', branch);
  // confirmation + delete logic
}


}
