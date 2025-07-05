import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { orderStatus } from '../../../../enums/orderStatus';
import { OrderdashboardService } from '../../../services/orderdashboard/orderdashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-AdminHome',
  imports:[CommonModule],
  templateUrl: './AdminHome.component.html',
  styleUrls: ['./AdminHome.component.css']
})
export class AdminHomeComponent implements OnInit {
  orders:any[]=[];
  selectedStatus:number = orderStatus.Pending;
  role:string ='';
  userId:string='';
statusList = [
  { id: orderStatus.Pending, name: 'Pending' },
  { id: orderStatus.Assigned, name: 'Assigned' },
  { id: orderStatus.Shipped, name: 'Shipped' },
  { id: orderStatus.Delivered, name: 'Delivered' },
  { id: orderStatus.Cancelled, name: 'Cancelled' },
  { id: orderStatus.Returned, name: 'Returned' }
];

  constructor(private orderdashboardService:OrderdashboardService , private toastrService:ToastrService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.userId = localStorage.getItem('userid') || '';
    this.getOrdersByStatus(this.selectedStatus);
  }

  getOrdersByStatus(status: number) {
    this.selectedStatus = status;
    this.orderdashboardService.getOrdersByStatus(status).subscribe({
   next: (data) => {
      this.orders = data;
      console.log("All Orders:", this.orders);
      console.log("Filtered Orders:", this.orders)  ; 
    },

   error:(err)=>{

    console.log("error",err)
    this.toastrService.error(err.error || 'Failed to fetch orders', 'Error');
   }  
    });
  }



  filterOrdersBasedOnRoles(allOrders:any[]): any[] 
  {
    switch(this.role.toLowerCase()){
      case 'vendor':
        return allOrders.filter(o=>o.vendorId === this.userId );
        case 'deliveryman':
          return allOrders.filter(o=>o.deliveryManId === this.userId );
        case 'admin':
          case'employee':
          return allOrders;
          default:
            return[]; 

    } 

  }
}
