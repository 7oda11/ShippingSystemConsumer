import { GovernmentService } from '../../../../../services/admin/GovernmentServise';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-add-government',
  templateUrl: './add-government.component.html',
  imports:[CommonModule,FormsModule ,RouterModule],
  styleUrls: ['./add-government.component.css']
})
export class AddGovernmentComponent implements OnInit  {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  


  gov={
    name:'',
    listCities:[]as string[]
  }
  newCity='';

 
  constructor(private governmentService :GovernmentService , private router:Router , private toastr:ToastrService) { }
  ngOnInit(): void {
    // this.toastr.info('Hello from Toastr!', 'Test');
  }



  AddCity(){
    const addedCity = this.newCity.trim();
    if(addedCity){
      this.gov.listCities.push(addedCity)
      this.newCity ='';
    }

  }

  removeCity(index:number){
    this.gov.listCities.splice(index,1);
  }
 submit(){
  this.governmentService.addGovernment(this.gov).subscribe({
   next: ()=>{
    this.toastr.success("Successfully Added!",'success')
    setTimeout(()=>{
      this.router.navigate(['dashboard/government'])
    },1500)
   },
   error: (err)=> {
    this.toastr.error("Error!, Not Added",'error')
    console.log("error", err)}
  })
 }





}
