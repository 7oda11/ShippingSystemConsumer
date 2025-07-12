import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/admin/order.service';
import { Order, OrderListResponse } from '../../../../models/GetOrder';
import Swal from 'sweetalert2';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { DeliveryService } from '../../../../services/admin/delivery.service';
import { ToastrService } from 'ngx-toastr';
import { Vendor } from '../../../../models/Vendor';
import { VendorServiceService } from '../../../../services/VendorService.service';

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
    cancelledOrReturnedNotes:''
  }

  totalPages: number = 0;
  currentPage: number = 1;
  selectedOrder!: UpdateOrderDTO;
  governmentNames: GovernmentName[] = [];
  cities: City[] = [];
  shippingTypes: ShippingType[] = [];
  statusList: Status[] = [];
  id: string | null = null;

  filteredOrders: Order[] = []; 
  searchTerm: string = ''; 

  selectedStatus: number |null=null;

  assignSelectedOrder:any = {}
  selectedDeliveryManId!:number;
  avilableDeliveryMen: any[] = [];
  shippedStatusId: number | null = null;
  assignedStatusId: number | null = null;
  vendors: Vendor[] = [];
  constructor(
    private orderService: OrderService,
    private cityService: CityService,
    private governmentService: GovernmentService,
    private shippingTypeService: ShippingTypeService,
    private statusService: StatusService,
    private deliveryService: DeliveryService,
    private toastr:ToastrService,
    private vendorService:VendorServiceService
  ) {}


  ngOnInit(): void {

    this.loadStatuses();
    this.loadOrders(this.currentPage);
    this.loadGovernorates();
    this.loadShippingTypes();
    this.loadVendors();
    
  }

  loadVendors(): void {
  this.vendorService.getAllVendors().subscribe({
    next: (data) => this.vendors = data,
    error: (err) => console.error('Error loading vendors:', err)
  });
}

onVendorChange(event: Event): void {
  const selectedVendorName = (event.target as HTMLSelectElement).value;
  const selectedVendor = this.vendors.find(v => v.name === selectedVendorName);

  if (selectedVendor) {
    this.selectedOrder.vendorName = selectedVendor.name;
    this.selectedOrder.vendorAddress = selectedVendor.address;
    console.log("Address updated to:", selectedVendor.address);
  } else {
    this.selectedOrder.vendorAddress = '';
  }
}



orderReason(order: Order): void {
  const reason = order.cancelledOrReturnedNotes || 'No reason provided.';
 console.log(order.cancelledOrReturnedNotes);
  Swal.fire({
    title: order.status?.toLowerCase() === 'canceled' ? 'Cancellation Reason' : 'Return Reason',
    text: reason,
    icon: 'info',
    confirmButtonColor: '#3085d6'
  });
}


shipStatus(orderId: number, newStatusId: number): void {
  if (!newStatusId) {
    Swal.fire('Error', 'Shipped status is not loaded yet.', 'error');
    return;
  }

  Swal.fire({
    title: 'Do you want to ship this order?',
    text: "You are about to mark this order as shipped.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#198754',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, ship it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.orderService.updateOrderStatus(orderId, newStatusId).subscribe({
        next: () => {
          Swal.fire('Success!', 'Order status updated to Shipped.', 'success');
          this.loadOrders(this.currentPage);
        },
        error: (err) => {
          Swal.fire('Error!', 'Failed to update status.', 'error');
          console.error('Error updating status:', err);
        }
      });
    }
  });
}

isReturnedOrCanceled(order: Order): boolean {
  const statusName = order.status?.toLowerCase();
  return statusName === 'returned' || statusName === 'canceled';
}

isReturnedOrCanceledView(): boolean {
  const selectedStatusObj = this.statusList.find(s => +s.id === this.selectedStatus);

  const name = selectedStatusObj?.name?.toLowerCase();
  return name === 'returned' || name === 'canceled';
}
showStatusText(order: Order): boolean {
  const status = order.status?.toLowerCase();
  return status === 'pending' || status === 'delivered' || status === 'canceled' || status === 'returned';
}


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

onSearch(): void {
  
  this.loadOrders(1);
}
onStatusFilter(statusId: number | null): void {
  this.selectedStatus = statusId;
  this.loadOrders(this.currentPage); // استخدم selectedStatus هنا
}
filterOrders(): void {
  const term = this.searchTerm.toLowerCase().trim();

  this.filteredOrders = this.orders.filter(order => {
    const matchesSearch =
      !term || order.customerName?.toLowerCase().includes(term) ||
      order.vendorName?.toLowerCase().includes(term) ||
      order.status?.toLowerCase().includes(term) ||
      order.city?.toLowerCase().includes(term) ||
      order.governmennt?.toLowerCase().includes(term);

    const matchesStatus =
      this.selectedStatus === null || order.statusId === this.selectedStatus;

    return matchesSearch && matchesStatus;
  });

  this.currentPage = 1;
}


  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }

loadOrders(page: number): void {
  this.orderService.getAllOrders(page,this.searchTerm.trim(),  this.selectedStatus ?? undefined).subscribe({
    next: (res: OrderListResponse) => {
      this.orders = res.data;
       this.filteredOrders = res.data; 
      this.totalPages = res.totalPages;
      this.currentPage = res.pageNumber;
     console.log('Loaded Orders:', this.orders);

      // 🔄 مهم جدًا
      // this.filterOrders(); 
     
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
        this.orderService.deleteOrder(order.id.toString()).subscribe({
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
        this.loadOrders(this.currentPage);
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
    next: (data) => {
      this.statusList = data;

      // ابحث عن الحالة اللي اسمها "Shipped"
      const shipped = data.find(status => status.name.toLowerCase() === 'shipped');
      this.shippedStatusId = shipped ? parseInt(shipped.id)  : null;
      console.log( this.shippedStatusId);

        // Get status ID for "Assigned"
      const assigned = data.find(s => s.name.toLowerCase() === 'assigned');
      this.assignedStatusId = assigned ? +assigned.id : null;
    },
    error: (err) => console.error('Error loading statuses:', err)
  });
}

isShipped(order: Order): boolean {
  const shipped = this.statusList.find(s => s.name.toLowerCase() === 'shipped');
  return order.statusId === (shipped ? +shipped.id : -1);
}

isAssigned(order: Order): boolean {
  return order.statusId === this.assignedStatusId;
}
printOrderInvoice(orderId: number): void {
  Swal.fire({
    title: 'Do you want to print the invoice?',
    text: 'You are about to print this order\'s invoice.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#198754',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, print it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.orderService.printOrderInvoice(orderId).subscribe({
        next: (blob) => {
          const fileURL = URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
          Swal.fire({
            icon: 'success',
            title: 'Invoice opened',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Print failed',
            text: 'Something went wrong while printing the invoice.'
          });
        }
      });
    }
  });
}


//assign order to delivery man
  openAssignModal(assignOrder:any){
  console.log("Assign order clicked:", assignOrder); 

   if(!assignOrder.cityId){
        this.toastr.error("City ID is missing in selected order"  );
        return;


   }
    this.assignSelectedOrder = assignOrder
    const cityId = assignOrder.cityId;
    this.deliveryService.getDeliveryMenbyCityId(cityId).subscribe({
      next:(res)=>{
        this.avilableDeliveryMen= res;
        console.log(res);
        const modalAssign = new bootstrap.Modal(document.getElementById('assignModal'));
       modalAssign.show();
      },
      error:(err)=>{
        this.toastr.error("Failed to load", err.error || ""  )
        console.log(err)
      },

    })
  }

  assignOrderToDeliveryMan(orderId: number, deliveryManId: number): void {
    if (!deliveryManId) {
    this.toastr.error("Please select a delivery man.");
    return;
  }
      console.log("Assigning order:", orderId, "To delivery man:", deliveryManId);
    this.orderService.assignOrderToDeliveryMan(Number(orderId) ,deliveryManId).subscribe({
      next:(res)=>{
        // this.toastr.success("Order Assigned Successfully",'success');
              Swal.fire('Success', 'Order Assigned successfully', 'success');
        
        this.ngOnInit();
        bootstrap.Modal.getInstance(document.getElementById('assignModal'))?.hide();
      },
      error: (err) => {
       Swal.fire('Error', 'Something went wrong!', 'error');
      this.toastr.error("Failed to assign order.");
      console.error("error assigning order", err)
    }
    })

  }
  
}
