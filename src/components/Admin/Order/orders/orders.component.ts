import { Component, OnInit } from '@angular/core';
import {CommonModule, DatePipe } from '@angular/common'

@Component({
  selector: 'app-orders',
 imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [
    {
      id: 1,
      serialNumber: '4930529',
      customerName: 'Ahmed',
      customerPhone: '01111446656',
      date: '2021-09-21T00:25:00',
      city: 'Al-Arab',
      governorate: 'Port Said',
      totalCost: 500
    },
    {
      id: 2,
      serialNumber: '8264123',
      customerName: 'Bilal',
      customerPhone: '01122555888',
      date: '2021-05-19T11:18:00',
      city: 'Giza',
      governorate: 'Cairo',
      totalCost: 100
    },
    {
      id: 3,
      serialNumber: '6903771',
      customerName: 'Bilal',
      customerPhone: '01122555888',
      date: '2021-05-19T11:18:00',
      city: 'Maadi',
      governorate: 'Cairo',
      totalCost: 100
    },
    {
      id: 4,
      serialNumber: '78382639',
      customerName: 'Bilal',
      customerPhone: '01122555888',
      date: '2021-05-19T11:18:00',
      city: 'Maadi',
      governorate: 'Cairo',
      totalCost: 100
    },
    {
      id: 5,
      serialNumber: '5900001',
      customerName: 'Laila',
      customerPhone: '01234567890',
      date: '2021-06-10T10:30:00',
      city: 'Nasr City',
      governorate: 'Cairo',
      totalCost: 250
    }
  ];

  pagedOrders: Order[] = [];
  currentPage = 1;
  pageSize = 3;

  ngOnInit(): void {
    this.changePage(1);
    }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.pagedOrders = this.orders.slice(startIndex, startIndex + this.pageSize);
  }
}

interface Order {
  id: number;
  serialNumber: string;
  customerName: string;
  customerPhone: string;
  date: string;
  city: string;
  governorate: string;
  totalCost: number;
}


