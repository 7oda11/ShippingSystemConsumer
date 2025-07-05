import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderdashboardService {

constructor(private httpClient:HttpClient) { }

 private baseUrl = "https://localhost:7109/api/Order/";

 getOrdersByStatus(statusId?:number):Observable<any[]> {
  let params = new HttpParams();
  if(statusId!= undefined){
    params = params.set('statusId', statusId.toString());
  }
     return this.httpClient.get<any[]>(`${this.baseUrl}TrackORders`, { params });

  }
 
  
 }




