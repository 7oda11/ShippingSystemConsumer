import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddVendor } from '../../../../models/AddVendor';
import { VendorServiceService } from '../../../../services/VendorService.service';
import { ToastrService } from 'ngx-toastr';
import { GovernmentName } from '../../../../models/GovernmentName';
import { City } from '../../../../models/City';
import { CityName } from '../../../../models/CityName';

@Component({
  selector: 'app-add-vendor',
  imports:[CommonModule, FormsModule],
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  newVendor :AddVendor={
    name:'',
    email: '',
    password:'',
    phone:'',
    address:'',
    GovernmentId:0,
    CityId:0
  }

  showPassword:boolean = false;
governments:GovernmentName[]=[]
Cities:CityName[]=[]
  constructor(private vendorServise:VendorServiceService, private toastr:ToastrService , private router:Router) { }

  ngOnInit() {
    this.getAllGovernment()
  }


  getAllGovernment(){
    this.vendorServise.getAllGovernments().subscribe({
      next:(res)=>{
        this.governments= res
      },
      error:(err)=>{
        console.log("Error",err)
      }
    })
  }

  GetAllCities(){
    this.vendorServise.getCitiesByGovId(this.newVendor.GovernmentId).subscribe({
      next:(res)=>{
          this.Cities = res
      },
      error:(err)=>{
        console.log("Error",err)
      }
    })
  }

  Add(form:any){
    if(form.valid){
      this.vendorServise.addVendor(this.newVendor).subscribe({
        next:(res)=>{this.newVendor= res
          this.toastr.success("Vendor Added Successfully",'success')
          this.router.navigate(['/dashboard/vendors'])
        },
        error:(err)=>{
          console.log("error",err)
          this.toastr.error("Failed To Add",'error')
        }
      })
    }

  }

}
