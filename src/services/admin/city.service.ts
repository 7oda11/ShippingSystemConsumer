import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../../models/City';
import { Branch } from '../../models/Branch';
import { Government } from '../../models/Governmernt';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'https://localhost:7109/api/';

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl+'City/');
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}City/${id}`);
  }

  createCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.apiUrl}City/`, city);
  }

 updateCity(city: City): Observable<City> {
  return this.http.put<City>(`${this.apiUrl}City/${city.id}`, city);
}

deleteCity(id: number): Observable<City> {
  return this.http.delete<City>(`${this.apiUrl}City/${id}`);
}

  getGovernments(): Observable<Government[]> {
    return this.http.get<Government[]>(`https://localhost:7109/api/Government`);
  }
}
