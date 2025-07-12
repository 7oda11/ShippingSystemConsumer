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
//  getAllOrders(page: number): Observable<OrderListResponse> {
//   return this.http.get<OrderListResponse>(`${this.baseUrl}/GetAllOrders?pageNumber=${page}`);
// }
getAllOrders(page: number, searchTerm?: string, statusId?: number) {
  const params: any = {
    pageNumber: page,
    pageSize: 4
  };

  if (searchTerm) params.searchTerm = searchTerm;
  if (statusId !== undefined) params.status = statusId;

  return this.http.get<OrderListResponse>(`${this.baseUrl}/GetAllOrders`, { params });
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

assignOrderToDeliveryMan(orderId:number, deliveryManId:number):Observable<any>{
  return this.http.put<any>(`${this.baseUrl}/EmployeeAssignOrderToDeliveyMan/${orderId}/${deliveryManId}`, {}, {
    responseType:'text' as 'json'
  })
}


//update sorder status to shipped
updateOrderStatus(orderId: number, statusId: number) {
  return this.http.put(`${this.baseUrl}/UpdateOrderStatus/${orderId}/${statusId}`, {});
}


//print orderInvoice
printOrderInvoice(orderId: number) : Observable<Blob>{
  return this.http.get(`${this.baseUrl}/ExportInvoice/${orderId}`, {responseType: 'blob'});
}


}

