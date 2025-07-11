import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../../models/delivery';
import { AddDelivery } from '../../models/add-delivery';
import { UpdateDelivey } from '../../models/update-delivey';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private baseUrl = 'https://localhost:7109/api/DeliveryMan/';
  constructor(private http: HttpClient) {}

  // Get all employees
  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.baseUrl);
  }
  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.baseUrl + id);
  }

  // Add a new employee
  addDelivery(delivery: AddDelivery): Observable<AddDelivery> {
    return this.http.post<AddDelivery>(this.baseUrl + 'Create', delivery);
  }
  // Update an existing employee
  updateDelivery(delivery: UpdateDelivey): Observable<UpdateDelivey> {
    return this.http.put<UpdateDelivey>(`${this.baseUrl}`, delivery);
  }
  // Delete an employee
  deleteDelivery(id: number) {
    return this.http.delete(`https://localhost:7109/api/DeliveryMan/${id}`);
  }


  getDeliveryMenbyCityId(cityId:number):Observable<any>{
return this.http.get<any>(`https://localhost:7109/api/DeliveryMan/GetDeliveryMenByCityID/${cityId}`);

}
}
