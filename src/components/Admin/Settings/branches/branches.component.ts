import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BranchService } from '../../../../services/admin/branch.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


declare var bootstrap: any;

@Component({
  selector: 'app-branches',
  imports: [CommonModule, RouterLink, FormsModule,],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit {
  selectedBranch: any = { id: 0, name: '', phone: '', address: '' };

  branches: any[] = [];

  constructor(private branchService: BranchService) { }


  ngOnInit(): void {
    this.gitBranches();
  }

  //get all branches
  gitBranches() {
    this.branchService.gitBranches().subscribe({
      next: (data) => {
        this.branches = data;
        console.log('Branches loaded:', data);
      },
      error: (err) => {
        console.error('Error fetching branches:', err);
      }
    });
  }

  //update branch
  updateBranch() {
    this.branchService.updateBranch(this.selectedBranch).subscribe({
      next: (res) => {
        console.log('Updated:', res);
        this.gitBranches();
        console.log('Sending data to API:', this.selectedBranch);

        // Close modal manually
        const modalElement = document.getElementById('editModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update branch');
      }
    });
  }

  //delete branch
deleteBranch(branch: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to delete "${branch.name}"?`,
    icon: 'warning',
    background: '#f8f9fa', // خلفية فاتحة جدًا (رمادي أبيض)
    color: '#155293',      // نص كحلي غامق
    showCancelButton: true,
    confirmButtonColor: '#dc3545',  // أحمر فاتح
    cancelButtonColor: '#155293',   // كحلي
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'rounded-4 shadow',
      confirmButton: 'fw-bold px-4 py-2',
      cancelButton: 'fw-bold px-4 py-2'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.branchService.deleteBranch(branch.id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Branch has been deleted.',
            icon: 'success',
            background: '#f8f9fa',
            color: '#155293',
            confirmButtonColor: '#198754', // أخضر لطيف
            customClass: {
              popup: 'rounded-4 shadow',
              confirmButton: 'fw-bold px-4 py-2'
            }
          });
          this.gitBranches();
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting.',
            icon: 'error',
            background: '#fff3f3',
            color: '#d33',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  });
}


  openEditModal(branch: any) {
    this.selectedBranch = { ...branch };
    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }

  ngAfterViewInit() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }





}
