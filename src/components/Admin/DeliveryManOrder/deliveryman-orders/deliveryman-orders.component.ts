import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { orderStatus } from '../../../../../enums/orderStatus';
import { OrderdashboardService } from '../../../../services/orderdashboard/orderdashboard.service';
import { ToastrService } from 'ngx-toastr';
import { StatusService } from '../../../../services/admin/status.service';
import Swal from 'sweetalert2';
// Add this line if using Bootstrap via CDN or script tag
declare var bootstrap: any;

@Component({
  selector: 'app-deliveryman-orders',
  imports:[CommonModule, FormsModule],
  templateUrl: './deliveryman-orders.component.html',
  styleUrls: ['./deliveryman-orders.component.css']
})
export class DeliverymanOrdersComponent implements OnInit {
 
  orders:any[] = [];
  selectedStatus!:number
  role:string='';
  userId:string='';
  statuses:any[]=[];
  selectedOrder: any = null;
  selectedStatusId!:number;
  cancellationNote:string='';
  deliveredStatusId:number = orderStatus.Delivered;
  statusList = [
    { id: orderStatus.Pending, name: 'Pending' },
    { id: orderStatus.Assigned, name: 'Assigned' },
    { id: orderStatus.Shipped, name: 'Shipped' },
    { id: orderStatus.Delivered, name: 'Delivered' },
    { id: orderStatus.Cancelled, name: 'Cancelled' },
    { id: orderStatus.Returned, name: 'Returned' },
    {id: orderStatus.OnHold, name: 'OnHold'},
    {id:orderStatus.Refunded,name:'Refused'}
  ];

  constructor(private orderdashboardService:OrderdashboardService, private toastr:ToastrService, private statusService:StatusService) { }


  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.userId = localStorage.getItem('userid') || '';
    this.selectedStatus = orderStatus.Assigned; // Default status for deliveryman
    // this.getOrdersByStatus(this.selectedStatus);
    this.loadOrders();
    this.loadAllStatus();
   
    
  }

  loadOrders(){
    this.orderdashboardService.getOrdersByStatus(this.selectedStatus).subscribe({
      next:(res)=>{
        this.orders= res;
        this.toastr.success('Orders fetched successfully', 'Success');
        console.log('All orders:',this.orders);
      },
      error:(err)=>{
        this.toastr.error(err.error || 'Failed to fetch orders', 'Error');
        console.error('Error fetching orders:', err);
      }
    })
}


 onStatusTabClick(statusId :number){
      this.selectedStatus = statusId;
      this.loadOrders();

    }
    loadAllStatus(){
         this.statusService.getStatuses().subscribe({
        next:(data)=>{
          this.statuses= data;
          console.log('All statuses:', this.statuses);
        },
         error:(err)=>{
        this.toastr.error(err.error || 'Failed to fetch Statuses', 'Error');
        console.error('Error fetching Statuses:', err);
      }
      })
    
    }     

 openChangeStatusModal(order:any){
  this.selectedOrder = order;
  this.selectedStatusId = order.statusId;
  this.cancellationNote = '';

  setTimeout(() => {
    const modalElement = document.getElementById('changestatusModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found: #statusModal');
    }
  }, 0);


    }

    isCancellationStatus(statusId:number|null):boolean{
        const status = this.statuses.find(s => s.id === statusId);
        return status && (status.name === 'Cancelled' || status.name === 'Returned' || status.name === 'Refunded');
    }

    changeOrderStatus(){

      if(!this.selectedOrder || !this.selectedStatusId) return;
        const isCancel = this.isCancellationStatus(this.selectedStatusId);
      const body = {
        orderId: this.selectedOrder.id,
        newStatusId: this.selectedStatusId,
        cancellationNote: this.cancellationNote||null,
        
      }

      this.orderdashboardService.changeStatusByDeliveryMan(body).subscribe({
        next:()=>{
          Swal.fire('Success', 'Status Changed Successsfully', 'success');
          const modal = bootstrap.Modal.getInstance(document.getElementById('changestatusModal'));
          if (modal) {
            modal.hide();
          }
          this.loadOrders();
        
        },
        error:(err)=>{
          Swal.fire('Error', err.error || 'Failed to change status', 'error');
          console.error('Error changing status:', err);
          // const modal = bootstrap.Modal.getInstance(document.getElementById('changestatusModal'));
        }
      })
    }

    
}
