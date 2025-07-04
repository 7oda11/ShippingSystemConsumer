import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { WeightSettingService } from '../../../../services/admin/weight-setting.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

import { WeightSetting } from '../../../../models/weight-setting';

@Component({
  selector: 'app-weight-settings',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './weight-settings.component.html',
  styleUrl: './weight-settings.component.css',
})
export class WeightSettingsComponent {
  selectedWeightSetting: WeightSetting = {
    id: '0',
    weightRange: '',
    extraPrice: '',
  };

  WeightSettings: WeightSetting[] = [];

  constructor(private WeightSettingService: WeightSettingService) {}

  ngOnInit(): void {
    this.gitWeightSetting();
  }

  //get all branches
  gitWeightSetting() {
    this.WeightSettingService.getWeightSetting().subscribe({
      next: (data) => {
        this.WeightSettings = data;
        console.log('weight setting loaded:', data);
      },
      error: (err) => {
        console.error('Error fetching bran:', err);
      },
    });
  }

  //update branch
  updateWeightSetting() {
    this.WeightSettingService.updateWeightSetting(
      this.selectedWeightSetting
    ).subscribe({
      next: (res) => {
        console.log('Updated:', res);
        this.gitWeightSetting();
        console.log('Sending data to API:', this.selectedWeightSetting);

        // Close modal manually
        const modalElement = document.getElementById('editModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update weight setting');
      },
    });
  }

  //delete branch
  deleteWeightSetting(weightSetting: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${weightSetting.weightRange}"?`,
      icon: 'warning',
      background: '#f8f9fa', // خلفية فاتحة جدًا (رمادي أبيض)
      color: '#155293', // نص كحلي غامق
      showCancelButton: true,
      confirmButtonColor: '#dc3545', // أحمر فاتح
      cancelButtonColor: '#155293', // كحلي
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-4 shadow',
        confirmButton: 'fw-bold px-4 py-2',
        cancelButton: 'fw-bold px-4 py-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.WeightSettingService.deleteWeightSetting(
          weightSetting.id
        ).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'weightsetting has been deleted.',
              icon: 'success',
              background: '#f8f9fa',
              color: '#155293',
              confirmButtonColor: '#198754', // أخضر لطيف
              customClass: {
                popup: 'rounded-4 shadow',
                confirmButton: 'fw-bold px-4 py-2',
              },
            });
            this.gitWeightSetting();
          },
          error: () => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong while deleting.',
              icon: 'error',
              background: '#fff3f3',
              color: '#d33',
              confirmButtonColor: '#d33',
            });
          },
        });
      }
    });
  }

  openEditModal(weightSetting: any) {
    this.selectedWeightSetting = { ...weightSetting };
    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }

  ngAfterViewInit() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
