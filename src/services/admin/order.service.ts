import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrder } from '../../models/Order';
import { Observable } from 'rxjs';
import { Order, OrderListResponse } from '../../models/GetOrder';
import { UpdateOrderDTO } from '../../models/UpdateOrder';

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

// get by id
getById(id:string):Observable<UpdateOrderDTO>{
  return this.http.get<UpdateOrderDTO>(`${this.baseUrl}/GetOrderById/${id}`)
}

//update function
updateOrder(id:string,order:UpdateOrderDTO):Observable<UpdateOrderDTO>{
  return this.http.put<UpdateOrderDTO>(`${this.baseUrl}/UpdateOrder/${id}`,order)
}

//delete order
deleteOrder(id:string):Observable<Order>{
  return this.http.delete<Order>(`${this.baseUrl}/DeleteOrder/${id}`);
}



}
