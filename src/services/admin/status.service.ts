import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '../../models/Status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  // Define the base URL for the API
  private baseUrl = 'https://localhost:7109/api/Status';
  constructor(private http: HttpClient) { }

  // Get all statuses
  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.baseUrl);
  }
  // Update a status
  updateStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.baseUrl}/${status.id}`, status);
  }
  // Delete a status
  deleteStatus(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // Create a new status
  createStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.baseUrl, status);
  }
}
