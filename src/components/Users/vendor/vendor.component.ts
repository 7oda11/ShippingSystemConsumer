import { VendorServiceService } from './../../../services/VendorService.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vendor } from '../../../models/Vendor';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vendor',
  imports: [CommonModule, RouterLink  ],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent  implements OnInit {
allVendors:Vendor[] = []
vendorId:string=''
@ViewChild('closeModalBtn')closeModalBtn!:ElementRef

constructor(private vendorService : VendorServiceService, private toastr:ToastrService , private router:Router){}



  ngOnInit(): void {
  this.getAllVendors()
  }

  getAllVendors(){
      this.vendorService.getAllVendors().subscribe({
      next:(data)=>{this.allVendors = data},
      error:(err)=>{console.log("error",err)}
    })
  }
  setVendorId(id:string){
this.vendorId= id 
  }
  confirmDelete(){
    if(this.vendorId){
      this.vendorService.DeleteVendor(this.vendorId).subscribe({
        next:()=>{
          this.toastr.success("Deleted Successfully",'success')
          this.router.navigate(['/vendors'])
          this.closeModalBtn.nativeElement.click()
          this.getAllVendors()
        },
        error:(err)=>{
          this.toastr.error("Failed Delete",'error')
          console.log("error",err)
        }
      })
    }


  }
  
} 


