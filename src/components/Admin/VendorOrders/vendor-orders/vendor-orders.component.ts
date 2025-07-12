import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { orderStatus } from '../../../../../enums/orderStatus';
import { OrderdashboardService } from '../../../../services/orderdashboard/orderdashboard.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../../services/admin/order.service';
import { CityService } from '../../../../services/admin/city.service';
import { DeliveryService } from '../../../../services/admin/delivery.service';
import { StatusService } from '../../../../services/admin/status.service';
import { ShippingTypeService } from '../../../../services/admin/shipping-type.service';
import { GovernmentService } from '../../../../services/admin/GovernmentServise';
import { UpdateOrderDTO } from '../../../../models/UpdateOrder';
import { GovernmentName } from '../../../../models/GovernmentName';
import { City } from '../../../../models/City';
import { ShippingType } from '../../../../models/shippingType';
import { Status } from '../../../../models/Status';
import { Order } from '../../../../models/GetOrder';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
declare var bootstrap: any;


@Component({
  selector: 'app-vendor-orders',
  imports:[CommonModule,FormsModule, RouterLink],
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.css']
})
export class VendorOrdersComponent implements OnInit {
  orders:any[]=[];
role:string ='';
userId:string ='';
selectedStatus!:number;
  mystatusList = [
    { id: orderStatus.Pending, name: 'Pending' },
    { id: orderStatus.Assigned, name: 'Assigned' },
    { id: orderStatus.Shipped, name: 'Shipped' },
    { id: orderStatus.Delivered, name: 'Delivered' },
    { id: orderStatus.Cancelled, name: 'Cancelled' },
    { id: orderStatus.Returned, name: 'Returned' },
    {id: orderStatus.OnHold, name: 'OnHold'},
    {id:orderStatus.Refunded,name:'Refused'}
  ];
  updatedorder = {
      id: 0,
      customerName: '',
      customerPhone1: '',
      customerPhone2: '',
      email: '',
      governmentId: 0,
      cityId: 0,
      address: '',
      isShippedToVillage: false,
      shippingTypeId: 0,
      vendorName: '',
      vendorAddress: '',
      statusId: 0,
      vendorId: 0,
      totalPrice: 0,
      notes: '',
      totalWeight: 0,
      orderItems: [],
    }
  
    totalPages: number = 0;
    currentPage: number = 1;
    selectedOrder!: UpdateOrderDTO;
    governmentNames: GovernmentName[] = [];
    cities: City[] = [];
    shippingTypes: ShippingType[] = [];
    statusList: Status[] = [];
    id: string | null = null;
  constructor(private orderdashboardService:OrderdashboardService,
     private toaster:ToastrService,
    private orderService: OrderService,
        private cityService: CityService,
        private governmentService:GovernmentService,
        private shippingTypeService: ShippingTypeService,
        private statusService: StatusService,
        private deliveryService: DeliveryService,
        private toastr:ToastrService) { }

  ngOnInit() {
this.role = localStorage.getItem('role') || '';
this.userId = localStorage.getItem('userid') || '';
this.selectedStatus= orderStatus.Pending
console.log('statusList:', this.statusList);
this.loadGovernorates();
this.loadShippingTypes();
this.loadVendorOrdersBystatus();
  }


  loadVendorOrdersBystatus(){
    this.orderdashboardService.getOrdersByStatus(this.selectedStatus).subscribe({
      next:(res)=>{
        this.orders = res;
         console.log("Returned Orders: ", res);
        this.toaster.success('Orders fetched successfully', 'Success');

      },
      error:(err)=>{
        console.log("error",err);
        this.toaster.error(err.error || 'Failed to fetch orders', 'Error');
      }
    });
  }

  onStatusTabClick(statusId :number){
      this.selectedStatus = statusId;
      this.loadVendorOrdersBystatus();

    }



    //Delete  -- success delete

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
            this.orderService.deleteOrder(order.id.toString()).subscribe({
              next: () => {
                Swal.fire('Deleted!', 'Order has been deleted.', 'success');
                this.loadVendorOrdersBystatus();
              },
              error: () => {
                Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
              }
            });
          }
        });
      }
//Edit Order
      calculateUpdatedTotals(): void {
    if (!this.selectedOrder) return;

    let totalPrice = 0;
    let totalWeight = 0;

    for (const item of this.selectedOrder.orderItems) {
      const quantity = item.quantity ?? 0;
      const price = item.price ?? 0;
      const weight = item.weight ?? 0;

      totalPrice += quantity * price;
      totalWeight += quantity * weight;
    }

    this.selectedOrder.totalPrice = totalPrice;
    this.selectedOrder.totalWeight = totalWeight;
  }
      
      openEditModal(orderId: string): void {
          this.orderService.getById(orderId).subscribe({
            next: (data) => {
              this.selectedOrder = { ...data };
      
              const savedCityId = this.selectedOrder.cityId;
              this.cities = [];
      
              if (this.selectedOrder.governmentId) {
                this.cityService.getCitiesByGovernmentId(this.selectedOrder.governmentId).subscribe({
                  next: (cities) => {
                    this.cities = cities;
      
                    setTimeout(() => {
                      this.selectedOrder.cityId = savedCityId;
      
                      // ✅ بعد تعبئة البيانات، نحسب الوزن والسعر الإجمالي
                      this.calculateUpdatedTotals();
      
                      // ✅ ثم نفتح المودال
                      const modalElement = document.getElementById('editOrderModal');
                      if (modalElement) {
                        const modal = new bootstrap.Modal(modalElement);
                        modal.show();
                      }
                    });
                  },
                  error: (err) => console.error('Error loading cities:', err)
                });
              }
            },
            error: (err) => {
              console.error('Error fetching order by ID:', err);
            }
          });
        }
      
      
        addOrderItem(): void {
          this.selectedOrder.orderItems.push({
            productName: '',
            quantity: 1,
            weight: 0,
            price: 0
          });
          this.calculateUpdatedTotals();
        }
      
        removeOrderItem(index: number): void {
          if (this.selectedOrder.orderItems.length == 1) {
            Swal.fire({
              icon: 'warning',
              title: 'Cannot Delete',
              text: 'At least one product is required in the order.',
              confirmButtonColor: '#3085d6'
            });
      
          } else {
            this.selectedOrder.orderItems.splice(index, 1);
            this.calculateUpdatedTotals();
          }
      
        }
      
      
        // updateOrder(): void {
        //   this.orderService.updateOrder(this.selectedOrder.id.toString(), this.selectedOrder).subscribe({
      
        //     next: () => {
        //       Swal.fire('Success!', 'Order updated successfully.', 'success');
        //       const modalElement = document.getElementById('editOrderModal');
        //       if (modalElement) {
        //         const modal = bootstrap.Modal.getInstance(modalElement);
        //         if (modal) {
        //           modal.hide();
        //         }
        //       }
        //       this.loadOrders(this.currentPage);
        //       console.log('Sending order:', this.selectedOrder);
        //     },
        //     error: (err) => {
        //       console.log('Sending order:', this.selectedOrder);
        //       Swal.fire('Error!', 'Could not update order.', 'error');
        //       console.error(err);
        //     }
        //   });
        // }
      
        updateOrder(): void {
          const o = this.selectedOrder;
      
          if (!o.customerName || !/^[A-Za-z\sأ-ي]{3,}$/.test(o.customerName)) {
            Swal.fire('Validation Error', 'Please enter a valid Customer Name.', 'warning');
            return;
          }
      
          if (!o.customerPhone1 || !/^01[0-2,5]{1}[0-9]{8}$/.test(o.customerPhone1)) {
            Swal.fire('Validation Error', 'Please enter a valid Phone 1.', 'warning');
            return;
          }
      
          if (!o.email || o.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)) {
            Swal.fire('Validation Error', 'Invalid email format.', 'warning');
            return;
          }
      
          if (!o.governmentId || !o.cityId || !o.address || !o.shippingTypeId || !o.vendorAddress) {
            Swal.fire('Validation Error', 'All required fields must be filled.', 'warning');
            return;
          }
      
          if (!o.orderItems || o.orderItems.length === 0) {
            Swal.fire('Validation Error', 'At least one product is required.', 'warning');
            return;
          }
      
          const invalidItem = o.orderItems.find(item =>
            !item.productName ||
            item.quantity <= 0 ||
            item.weight < 0 ||
            item.price < 0
          );
      
          if (invalidItem) {
            Swal.fire('Validation Error', 'Each product must be valid and non-empty.', 'warning');
            return;
          }
      
          const calculatedPrice = o.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
          const calculatedWeight = o.orderItems.reduce((sum, item) => sum + (item.quantity * item.weight), 0);
      
          if (o.totalPrice !== calculatedPrice || o.totalWeight !== calculatedWeight) {
            Swal.fire('Validation Error', 'Totals do not match calculated values.', 'warning');
            return;
          }
      
          // ✅ لو كل شيء تمام، نكمل التحديث
          this.orderService.updateOrder(o.id.toString(), o).subscribe({
            next: () => {
              Swal.fire('Success!', 'Order updated successfully.', 'success');
              const modalElement = document.getElementById('editOrderModal');
              if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal?.hide();
              }
              this.loadVendorOrdersBystatus();
            },
            error: (err) => {
              console.error('Sending order:', this.selectedOrder);
              Swal.fire('Error!', 'Could not update order.', 'error');
            }
          });
      
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
