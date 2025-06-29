import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
 private apiUrl='https://localhost:7109/api/Branch/'
  constructor(private http: HttpClient) { }

  gitBranches(): Observable<any> {
      return this.http.get<any[]>(this.apiUrl+'GetAll');
  }

  addBranch(branch: any): Observable<any> {

    return this.http.post<any>(this.apiUrl+'add-branch', branch);
  }

  updateBranch(branch: any): Observable<any> {
 return this.http.put(`${this.apiUrl}Update-Branch/${branch.id}`, branch);
}

deleteBranch(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}Delete-Branch/${id}`);
}
}
