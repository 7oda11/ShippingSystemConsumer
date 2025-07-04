import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightSetting } from '../../models/weight-setting';

@Injectable({
  providedIn: 'root',
})
export class WeightSettingService {
  private apiUrl = 'https://localhost:7109/api/WeightSetting/';
  constructor(private http: HttpClient) {}

  getWeightSetting(): Observable<WeightSetting[]> {
    return this.http.get<WeightSetting[]>(this.apiUrl + 'GetAll');
  }

  addWeightSetting(WeightSetting: WeightSetting): Observable<WeightSetting> {
    return this.http.post<WeightSetting>(
      this.apiUrl + 'add-weightsetting',
      WeightSetting
    );
  }

  updateWeightSetting(WeightSetting: WeightSetting): Observable<WeightSetting> {
    return this.http.put<WeightSetting>(
      `${this.apiUrl}Update-WeightSettings/${WeightSetting.id}`,
      WeightSetting
    );
  }

  deleteWeightSetting(id: number): Observable<WeightSetting> {
    return this.http.delete<WeightSetting>(
      `${this.apiUrl}Delete-WeightSetting/${id}`
    );
  }
}
