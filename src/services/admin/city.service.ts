import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'https://localhost:7109/api/';

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<any[]>(this.apiUrl+'City/');
  }

  getCityById(id: number) {
    return this.http.get<any>(`${this.apiUrl}City/${id}`);
  }

  createCity(city: any) {
    return this.http.post(`${this.apiUrl}City/`, city);
  }

 updateCity(city: any) {
  return this.http.put(`${this.apiUrl}City/${city.id}`, city); 
}

deleteCity(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}City/${id}`);
}

  getGovernments() {
    return this.http.get<any[]>(`https://localhost:7109/api/Government`);

  }
}
