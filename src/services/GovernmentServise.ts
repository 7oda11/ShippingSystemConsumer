import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Government} from "../models/Governmernt";
import {GovernmentName} from "../models/GovernmentName"


@Injectable({
    providedIn: 'root'
})
export class GovernmentService {

    private baseUrl: string = "https://localhost:7109/";

    constructor(private httpClient: HttpClient) {

     }

     //get gov-names
     getGovernmentNames():Observable<GovernmentName[]>{
        return this.httpClient.get<GovernmentName[]>(this.baseUrl+"api/Government/Gov-Names")
     }
//get all govs with cities
     getAllGovernments():Observable<Government[]>{
        return this.httpClient.get<Government[]>(this.baseUrl+ "api/Government");
       }

//post new agov
       addGovernment(gov:{name:string,listCities:string[]}):Observable<any>{
         return this.httpClient.post(this.baseUrl+ "api/Government",gov)
       }

       //get by id
       getGovernmentById(id:string): Observable<Government>{
        return  this.httpClient.get<Government>(`${this.baseUrl}api/Government/${id}`)
       }
       //update 
       updateGovernment(id:string, gov:{name:string, listCities:string[]}):Observable<any>{
            return this.httpClient.put(`${this.baseUrl}api/Government/${id}`, gov)
       }
       //delete 
       deleteGovernment(id:string):Observable<any>{
        return this.httpClient.delete(`${this.baseUrl}api/Government/${id}`)
       }
}