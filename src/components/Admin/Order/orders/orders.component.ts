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

  constructor(
    private orderService: OrderService,
    private cityService: CityService,
    private governmentService: GovernmentService,
    private shippingTypeService: ShippingTypeService,
    private statusService: StatusService,
    private deliveryService: DeliveryService,
    private toastr:ToastrService
  ) {}


  ngOnInit(): void {

    this.loadStatuses();
    this.loadOrders(this.currentPage);
    this.loadGovernorates();
    this.loadShippingTypes();
    
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
// onSearch(): void {
//   const term = this.searchTerm.toLowerCase().trim();

//   if (!term) {
//     this.filteredOrders = [...this.orders];
//     return;
//   }

//   this.filteredOrders = this.orders.filter(order =>
//     order.customerName?.toLowerCase().includes(term) ||
//     order.vendorName?.toLowerCase().includes(term) ||
//     order.status?.toLowerCase().includes(term) ||
//     order.city?.toLowerCase().includes(term) ||
//     order.governmennt?.toLowerCase().includes(term)
//   );

//   // ✅ نعرض أول صفحة للنتائج الجديدة بعد البحث
//   this.currentPage = 1;
// }
onSearch(): void {
  // const term = this.searchTerm.toLowerCase().trim();
  // const selectedStatus = this.selectedStatus.toLowerCase().trim();

  // this.filteredOrders = this.orders.filter(order => {
  //   const matchesSearch =
  //     order.customerName?.toLowerCase().includes(term) ||
  //     order.vendorName?.toLowerCase().includes(term) ||
  //     order.status?.toLowerCase().includes(term) ||
  //     order.city?.toLowerCase().includes(term) ||
  //     order.governmennt?.toLowerCase().includes(term);

  //   const matchesStatus =
  //     !selectedStatus || order.status?.toLowerCase() === selectedStatus;

  //   return matchesSearch && matchesStatus;
  // });

  // this.currentPage = 1;
  // this.totalPages = Math.ceil(this.filteredOrders.length / 10);
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

  // openEditModal(orderId: string): void {
  //   this.orderService.getById(orderId).subscribe({
  //     next: (data) => {
  //       this.selectedOrder = { ...data }; // force full reassignment

  //       // 👇 احفظ مؤقتًا قيمة المدينة
  //       const savedCityId = this.selectedOrder.cityId;

  //       // 👇 امسح المدن مؤقتًا لإجبار إعادة التحميل
  //       this.cities = [];

  //       // 👇 حمّل المدن للمحافظة المحددة
  //       if (this.selectedOrder.governmentId) {
  //         this.cityService.getCitiesByGovernmentId(this.selectedOrder.governmentId).subscribe({
  //           next: (cities) => {
  //             this.cities = cities;

  //             // 👇 أرجع قيمة المدينة بعد تحميل القائمة
  //             setTimeout(() => {
  //               this.selectedOrder.cityId = savedCityId;
  //             });

  //             this.calculateUpdatedTotals();

  //             // 👇 افتح المودال بعد كل شيء
  //             const modalElement = document.getElementById('editOrderModal');
  //             if (modalElement) {
  //               const modal = new bootstrap.Modal(modalElement);
  //               modal.show();
  //             }
  //           },
  //           error: (err) => console.error('Error loading cities:', err)
  //         });
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching order by ID:', err);
  //     }
  //   });
  // }
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
      next: (data) => (this.statusList = data),
      error: (err) => console.error('Error loading statuses:', err)
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
