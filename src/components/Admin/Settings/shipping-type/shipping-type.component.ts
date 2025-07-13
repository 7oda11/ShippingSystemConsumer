import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShippingType } from '../../../../models/shippingType';
import { ShippingTypeService } from '../../../../services/admin/shipping-type.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-shipping-type',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './shipping-type.component.html',
  standalone: true,
  styleUrl: './shipping-type.component.css'
})
export class ShippingTypeComponent implements OnInit {
  shippingTypes: ShippingType[] = [];
  selectedShippingType: ShippingType = { id: 0, shippingTypeName: '', shippingPrice: 0 };
editModalInstance: any;

  constructor(private shippingTypeService: ShippingTypeService) {}
 

openEditModal(type: ShippingType) {
  this.selectedShippingType = { ...type };
  const modalElement = document.getElementById('editModal')!;
  this.editModalInstance = new bootstrap.Modal(modalElement);
  this.editModalInstance.show();
}


loadShippingTypes() {
  this.shippingTypeService.getShippingTypes().subscribe(
    (data) => {
      console.log('🚚 Shipping types from API:', data);
      this.shippingTypes = data;
    },
    (error) => {
      console.error('Error loading shipping types:', error);
    }
  );
}

updateShippingType() {
  // call API to update
  this.shippingTypeService.updateShippingType(this.selectedShippingType.id, this.selectedShippingType).subscribe(
    (response) => {
      console.log('Shipping type updated successfully:', response);
      this.loadShippingTypes();
      this.editModalInstance?.hide();
         Swal.fire({
              title: 'Success!',
              text: 'Shipping type updated successfully.',
              icon: 'success',
              background: '#f8f9fa',
              color: '#155293',
              confirmButtonColor: '#198754',
              customClass: {
                popup: 'rounded-4 shadow',
                confirmButton: 'fw-bold px-4 py-2'
              }
            });
    },
    (error) => {
      console.error('Error updating shipping type:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update shipping type.',
        icon: 'error',
        background: '#f8f9fa',
        color: '#155293',
        confirmButtonColor: '#dc3545',
        customClass: {
          popup: 'rounded-4 shadow',
          confirmButton: 'fw-bold px-4 py-2'
        }
      });
    }
  );
}


deleteShippingType(shippingType: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to delete "${shippingType.shippingTypeName}"?`,
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
      this.shippingTypeService.deleteShippingType(shippingType.id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Shipping type has been deleted.',
            icon: 'success',
            background: '#f8f9fa',
            color: '#155293',
            confirmButtonColor: '#198754', // أخضر لطيف
            customClass: {
              popup: 'rounded-4 shadow',
              confirmButton: 'fw-bold px-4 py-2'
            }
          });
          this.loadShippingTypes();
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'Cannot delete this shipping type because it is used in existing orders.',
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

 ngOnInit(): void {
      this.loadShippingTypes();
  }
    
    ngAfterViewInit() {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(tooltipTriggerEl => {
        // @ts-ignore
        return new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
}
