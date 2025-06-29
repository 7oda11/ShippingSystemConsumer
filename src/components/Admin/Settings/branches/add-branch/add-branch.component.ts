import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../../../../../services/admin/branch.service';

@Component({
  selector: 'app-add-branch',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css'
})
export class AddBranchComponent {
newBranch = {
    name: '',
    phone: '',
    address: ''
  };
 /**
  *
  */
 constructor(private branchService: BranchService, private router: Router) {}

  AddBranch() {
    if (!this.newBranch.name || !this.newBranch.phone || !this.newBranch.address) {
      alert('Please fill in all fields');
      return;
    }

    this.branchService.addBranch(this.newBranch).subscribe({
      next: (response) => {
        console.log('Branch added successfully:', response);
        this.router.navigate(['/settings/branches']);
      },
      error: (error) => {
        console.error('Error adding branch:', error);
        alert('Failed to add branch. Please try again.');
      }
    });
  }

}


