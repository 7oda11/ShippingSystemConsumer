import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrder } from '../../models/Order';
import { Observable } from 'rxjs';
import { Order, OrderListResponse } from '../../models/GetOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'https://localhost:7109/api/Order';

  constructor(private http: HttpClient) {}

  // Function to add order
  addOrder(order: AddOrder): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddOrder`,order);
  }

  // get all orders
 getAllOrders(page: number): Observable<OrderListResponse> {
  return this.http.get<OrderListResponse>(`${this.baseUrl}/GetAllOrders?pageNumber=${page}`);
}


//delete order
deleteOrder(id:string):Observable<Order>{
  return this.http.delete<Order>(`${this.baseUrl}/DeleteOrder/${id}`);
}

assignOrderToDeliveryMan(orderId:number, deliveryManId:number):Observable<any>{
  return this.http.put<any>(`${this.baseUrl}/EmployeeAssignOrderToDeliveyMan/${orderId}/${deliveryManId}`, {}, {
    responseType:'text' as 'json'
  })
}

}

