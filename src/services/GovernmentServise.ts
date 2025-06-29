import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Government} from "../models/Governmernt";


@Injectable({
    providedIn: 'root'
})
export class GovernmentService {

    private baseUrl: string = "https://localhost:7109/api/Government";

    constructor(private http: HttpClient) {

     }


     getAllGovernments():Observable<Government[]>{
        return this.http.get<Government[]>(this.baseUrl);
       }
}