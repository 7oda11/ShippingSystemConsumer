import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Status } from '../../../../../models/Status';
import { StatusService } from '../../../../../services/admin/status.service';

@Component({
  selector: 'app-add-status',
  imports: [CommonModule,FormsModule ,RouterModule],
  templateUrl: './add-status.component.html',
  styleUrl: './add-status.component.css'
})
export class AddStatusComponent {

  newStatus:Status = {
    name: '',
    id: ''
  };

  constructor(private statusService :StatusService,private router: Router) {}
  AddStatus() {
    if (!this.newStatus.name) {
      alert('Please fill in all fields');
      return;
    }

    this.statusService.createStatus(this.newStatus).subscribe({
      next: (response) => {
        console.log('Status added successfully:', response);
        this.router.navigate(['/dashboard/status']);
      },
      error: (error) => {
        console.error('Error adding status:', error);
        alert('Failed to add status. Please try again.');
      }
    });
}
}