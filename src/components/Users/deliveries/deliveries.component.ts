import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DeliveryService } from '../../../services/admin/delivery.service';
import { Delivery } from '../../../models/delivery';
import { Status } from '../../../models/Status';
import { CityService } from '../../../services/admin/city.service';
import { CityName } from '../../../models/CityName';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-deliveries',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.css',
})
export class DeliveriesComponent {
  cityName: CityName[] = [];
  deliveries: Delivery[] = [];
  selectedDelivery: Delivery = {
    id: 0,
    userName: '',
    password: '',
    email: '',
    fullName: '',
    name: '',
    phone: '',
    cityId: 0,
  };

  constructor(
    private deliveryService: DeliveryService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.loadDeliveries();
    this.loadCities();
  }

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => {
      // @ts-ignore
      return new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  loadDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe(
      (data) => {
        this.deliveries = data;
        console.log('Loaded deliveries:', this.deliveries);
      },
      (error) => {
        console.error('Error fetching deliveries:', error);
      }
    );
  }

  loadCities(): void {
    this.cityService.getCities().subscribe(
      (data) => {
        this.cityName = data;
      },
      (error) => {
        console.error('Error fetching deliveries:', error);
      }
    );
  }

  updateDelivery() {
    const payload: any = {
      id: this.selectedDelivery.id,
      fullName: this.selectedDelivery.fullName,
      email: this.selectedDelivery.email,
      userName: this.selectedDelivery.userName,
      branchId: this.selectedDelivery.cityId,
    };

    if (
      this.selectedDelivery.password &&
      this.selectedDelivery.password.trim() !== ''
    ) {
      payload.password = this.selectedDelivery.password;
    }

    this.deliveryService.updateDelivery(payload).subscribe(
      (res) => {
        console.log('Updated:', res);
        this.loadDeliveries();
        Swal.fire({
          title: 'Success!',
          text: 'Delivery updated successfully.',
          icon: 'success',
          background: '#f8f9fa',
          color: '#155293',
          confirmButtonColor: '#198754',
          customClass: {
            popup: 'rounded-4 shadow',
            confirmButton: 'fw-bold px-4 py-2',
          },
        });
        const modalElement = document.getElementById('editModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement!);
        modalInstance.hide();
      },
      (error) => {
        console.error('Update failed:', error);
        console.error('Update failed:', error.error.errors);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while updating.',
          icon: 'error',
          background: '#fff3f3',
          color: '#d33',
          confirmButtonColor: '#d33',
        });
      }
    );
  }

  deleteDelivery(delivery: Delivery) {
    console.log('Deleting employee with ID:', delivery.id);
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${delivery.userName}"?`,
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
        cancelButton: 'fw-bold px-4 py-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.deliveryService.deleteDelivery(delivery.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Delivery has been deleted.',
              icon: 'success',
              background: '#f8f9fa',
              color: '#155293',
              confirmButtonColor: '#198754',
              customClass: {
                popup: 'rounded-4 shadow',
                confirmButton: 'fw-bold px-4 py-2',
              },
            });
            this.loadDeliveries();
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

  openEditModal(delivery: Delivery) {
    this.selectedDelivery = {
      ...delivery,
      password: '', // Clear password field
      cityId: delivery.cityId ? Number(delivery.cityId) : 0,
    };

    console.log('Selected branchId value:', this.selectedDelivery.cityId);
    console.log(
      'Branch IDs in list:',
      this.deliveries.map((b) => b.id)
    );

    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }
}
