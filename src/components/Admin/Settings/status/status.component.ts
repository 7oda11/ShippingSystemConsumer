import { Component, OnInit } from '@angular/core';
import { Status } from '../../../../models/Status';
import { StatusService } from '../../../../services/admin/status.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-status',
  imports: [CommonModule, RouterLink, FormsModule,],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  statuses: Status[] = [];
  selectedStatus: Status = { id: '0', name: '' }; // تأكد من خصائص Status

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.loadStatuses();
  }

  loadStatuses() {
    this.statusService.getStatuses().subscribe({
      next: (data) => {
        this.statuses = data;
        console.log('Statuses loaded:', data);
      },
      error: (err) => {
        console.error('Error fetching statuses:', err);
      }
    });
  }

  updateStatus() {
    this.statusService.updateStatus(this.selectedStatus).subscribe({
      next: (res) => {
        console.log('Updated:', res);
        this.loadStatuses(); // إعادة تحميل القائمة
        console.log('Sending data to API:', this.selectedStatus);

        // إغلاق المودال
        const modalElement = document.getElementById('editModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update status');
      }
    });
  }

  deleteStatus(status: Status) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${status.name}"?`,
      icon: 'warning',
      background: '#f8f9fa',
      color: '#155293',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#155293',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-4 shadow',
        confirmButton: 'fw-bold px-4 py-2',
        cancelButton: 'fw-bold px-4 py-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.statusService.deleteStatus(status.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Status has been deleted.',
              icon: 'success',
              background: '#f8f9fa',
              color: '#155293',
              confirmButtonColor: '#198754',
              customClass: {
                popup: 'rounded-4 shadow',
                confirmButton: 'fw-bold px-4 py-2'
              }
            });
            this.loadStatuses();
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

  openEditModal(status: Status) {
    this.selectedStatus = { ...status };
    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
