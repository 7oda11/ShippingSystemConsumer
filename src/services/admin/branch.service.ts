import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../../models/Branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
 private apiUrl='https://localhost:7109/api/Branch/'
  constructor(private http: HttpClient) { }

  gitBranches(): Observable<Branch[]> {
      return this.http.get<Branch[]>(this.apiUrl+'GetAll');
  }

  addBranch(branch: Branch): Observable<Branch> {

    return this.http.post<Branch>(this.apiUrl+'add-branch', branch);
  }

  updateBranch(branch: Branch): Observable<Branch> {
 return this.http.put<Branch>(`${this.apiUrl}Update-Branch/${branch.id}`, branch);
}

deleteBranch(id: number): Observable<Branch> {
  return this.http.delete<Branch>(`${this.apiUrl}Delete-Branch/${id}`);
}
 getBranchById(id: number): Observable<Branch> {
 return this.http.get<Branch>(`${this.apiUrl}GetById/${id}`);
 }
}
