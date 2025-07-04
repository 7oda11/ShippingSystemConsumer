import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingType } from '../../models/shippingType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingTypeService {
  private url = 'https://localhost:7109/api/ShippingType';
  constructor(private http: HttpClient) { }

  getShippingTypes():Observable<ShippingType[]> {
    return this.http.get<ShippingType[]>(this.url);
  }

  getShippingType(id: string): Observable<ShippingType> {
    return this.http.get<ShippingType>(`${this.url}/${id}`);
  }

  createShippingType(shippingType: ShippingType): Observable<ShippingType> {
    return this.http.post<ShippingType>(this.url, shippingType);
  }

  updateShippingType(id: number, shippingType: ShippingType): Observable<ShippingType> {
    return this.http.put<ShippingType>(`${this.url}/${id}`, shippingType);
  }

  deleteShippingType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
