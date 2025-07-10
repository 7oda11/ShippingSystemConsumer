import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../../models/delivery';

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

  // Add a new employee
  addDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.baseUrl + 'Create', delivery);
  }
  // Update an existing employee
  updateDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.baseUrl}`, delivery);
  }
  // Delete an employee
  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }


  getDeliveryMenbyCityId(cityId:number):Observable<any>{
return this.http.get<any>(`https://localhost:7109/api/DeliveryMan/GetDeliveryMenByCityID/${cityId}`);

}
}
