import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/admin/order.service';
import { Order, OrderListResponse } from '../../../../models/GetOrder';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GovernmentName } from '../../../../models/GovernmentName';
import { City } from '../../../../models/City';
import { CityService } from '../../../../services/admin/city.service';
import { GovernmentService } from '../../../../services/admin/GovernmentServise';
import { Status } from '../../../../models/Status';
import { ShippingTypeService } from '../../../../services/admin/shipping-type.service';
import { StatusService } from '../../../../services/admin/status.service';
import { ShippingType } from '../../../../models/shippingType';
import { UpdateOrderDTO } from '../../../../models/UpdateOrder';
import { AddOrder } from '../../../../models/Order';

declare const bootstrap: any;

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  orders: Order[] = [];
  totalPages: number = 0;
  currentPage: number = 1;

  selectedOrder!: UpdateOrderDTO & { id: number };
  governmentNames: GovernmentName[] = [];
  cities: City[] = [];
  shippingTypes: ShippingType[] = [];
  statusList: Status[] = [];

  constructor(
    private orderService: OrderService,
    private cityService: CityService,
    private governmentService: GovernmentService,
    private shippingTypeService: ShippingTypeService,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.loadOrders(this.currentPage);
    this.loadGovernorates();
    this.loadShippingTypes();
    this.loadStatuses();
  }

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  loadOrders(page: number): void {
    this.orderService.getAllOrders(page).subscribe({
      next: (res: OrderListResponse) => {
        this.orders = res.data;
        this.totalPages = res.totalPages;
        this.currentPage = res.pageNumber;
      },
      error: (err) => console.error('Error loading orders:', err)
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadOrders(page);
    }
  }

  DeleteOrder(order: Order): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${order.customerName}" order?`,
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
        this.orderService.deleteOrder(order.id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Order has been deleted.', 'success');
            this.loadOrders(this.currentPage);
          },
          error: () => {
            Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
          }
        });
      }
    });
  }

  openEditModal(order: any): void {
    const selectedGov = this.governmentNames.find(g => g.name === order.governmennt);
    const selectedCity = this.cities.find(c => c.name === order.city);

    this.selectedOrder = {
      id: +order.id,
      customerName: order.customerName,
      customerPhone1: order.customerPhone1,
      customerPhone2: order.customerPhone2 ?? '',
      email: order.email ?? '',
      governmentId: Number(selectedGov?.id) ?? 0,
     cityId: Number(selectedCity?.id) ?? 0,
      villageName: order.villageName ?? '',
      isShippedToVillage: order.isShippedToVillage ?? false,
      shippingTypeId: order.shippingTypeId ?? 0,
      vendorName: order.vendorName ?? '',
      vendorAddress: order.vendorAddress ?? '',
      statusId: order.statusId ?? 0,
      vendorId: order.vendorId ?? undefined,
      totalPrice: order.totalPrice,
      notes: order.notes ?? '',
      totalWeight: order.totalWeight ?? 0,
      orderItems: order.orderItems ?? []
    };

    if (selectedGov) this.loadCities(Number(selectedGov.id));

    const modalElement = document.getElementById('editOrderModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  updateOrder(): void {
    // this.orderService.updateOrder(this.selectedOrder.id, this.selectedOrder).subscribe({
    //   next: () => {
    //     Swal.fire('Success!', 'Order updated successfully.', 'success');
    //     this.loadOrders(this.currentPage);
    //   },
    //   error: (err) => {
    //     Swal.fire('Error!', 'Could not update order.', 'error');
    //     console.error(err);
    //   }
    // });
  }

  loadGovernorates(): void {
    this.governmentService.getAllGovernments().subscribe({
      next: (data) => (this.governmentNames = data),
      error: (err) => console.error('Error loading governments:', err)
    });
  }

  loadCities(governmentId: number): void {
    this.cityService.getCitiesByGovernmentId(governmentId).subscribe({
      next: (data) => (this.cities = data),
      error: (err) => console.error('Error loading cities:', err)
    });
  }

  onGovernmentChange(governmentId: number): void {
    this.selectedOrder.cityId = 0;
    this.loadCities(governmentId);
  }

  loadShippingTypes(): void {
    this.shippingTypeService.getShippingTypes().subscribe({
      next: (data) => (this.shippingTypes = data),
      error: (err) => console.error('Error loading shipping types:', err)
    });
  }

  loadStatuses(): void {
    this.statusService.getStatuses().subscribe({
      next: (data) => (this.statusList = data),
      error: (err) => console.error('Error loading statuses:', err)
    });
  }
}
