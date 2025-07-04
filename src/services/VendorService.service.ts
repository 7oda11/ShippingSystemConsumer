import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../models/Vendor';
import { AddVendor } from '../models/AddVendor';
import { GovernmentName } from '../models/GovernmentName';
import { CityName } from '../models/CityName';
import { UpdateVendor } from '../models/UpdateVendor';

@Injectable({
  providedIn: 'root'
})
export class VendorServiceService {

constructor(private httpClient:HttpClient) { }
baseUrl= "https://localhost:7109/api/Vendor";

getAllVendors():Observable<Vendor[]>{
  return this.httpClient.get<Vendor[]>(this.baseUrl)
}

addVendor( vendor:AddVendor):Observable<AddVendor>{
   return  this.httpClient.post<AddVendor>(this.baseUrl + "/add-new-vendor-with-details",vendor)
}

getAllGovernments():Observable<GovernmentName[]>{
 return  this.httpClient.get<GovernmentName[]>("https://localhost:7109/api/Government/Gov-Names")
}

getCitiesByGovId(govId:number):Observable<CityName[]>{
return this.httpClient.get<CityName[]>(`https://localhost:7109/api/City/GetCitiesByGovId/${govId}`)
}

getVendorById(id:string):Observable<any>{
  return this.httpClient.get<any>(`https://localhost:7109/api/Vendor/${id}`)
}

UpdateVendorDetails(id:string, vendor:UpdateVendor):Observable<UpdateVendor>{

  return this.httpClient.put<UpdateVendor>(`https://localhost:7109/api/Vendor/Update-Vendor-Details/${id}`, vendor)
}

DeleteVendor(id:string):Observable<any>{
  return this.httpClient.delete(`https://localhost:7109/api/Vendor/${id}`)
}
}
