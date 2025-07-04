
import { Vendor } from './../../../../models/Vendor';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VendorServiceService } from '../../../../services/VendorService.service';
import { UpdateVendor } from '../../../../models/UpdateVendor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GovernmentName } from '../../../../models/GovernmentName';
import { CityName } from '../../../../models/CityName';

@Component({
  selector: 'app-edit-vendor',
  imports:[CommonModule,FormsModule],
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit {

  showPassword:boolean=false
  vendor={
id:'',
name :'',
email:'',
password : '',
phone: '',
address:'',
CityId:0,
GovernmentId:0
  }
id!:string
govId:number=0
Governments:GovernmentName[]=[]
Cities:CityName[]=[]

  constructor(private vendorService:VendorServiceService, private route:ActivatedRoute,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
 this.id = this.route.snapshot.paramMap.get('id')!;
    this.vendorService.getVendorById(this.id).subscribe({
      next:(res)=>{
          this.vendor = res
          console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.loadGovernments()
    this.GetAllCities()

  }

  loadGovernments(){
    this.vendorService.getAllGovernments().subscribe({
      next:(res)=>{
        this.Governments = res
      },
      error:(err)=>{
        console.log(err,"err")
      }
    })
  }
 
SaveChanges(form:any){
  if(form.valid){
    this.vendorService.UpdateVendorDetails(this.id , this.vendor).subscribe({
      next:()=>{
        this.toastr.success("Updated Successfully!",'success')
        this.router.navigate(['/dashboard/vendors'])
      },
      error:(err)=>{
        console.log("Error",err)
        this.toastr.error("Failed To Update", 'error')
      }
    })
  }



  
}


GetAllCities(){
this.vendorService.getCitiesByGovId(this.vendor.GovernmentId).subscribe({
  next:(res)=>{
    this.Cities = res
  },
  error:(err)=>{
    console.log("error",err)
  }
})
}
}
