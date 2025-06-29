import { GovernmentService } from './../../../../../services/GovernmentServise';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
// import { FormsModule } from '@angular/compiler';

@Component({
  selector: 'app-edit-government',
  imports: [CommonModule , FormsModule],
  templateUrl: './edit-government.component.html',
  styleUrls: ['./edit-government.component.css']
})
export class EditGovernmentComponent implements OnInit {
gov={
  name:'',
  listCities:[]as string[]
}
newCity ='';
id! :string;

  constructor(private route:ActivatedRoute, private  governmentService: GovernmentService , private router:Router , private toastr:ToastrService) { }

  ngOnInit():void {
   this.id = this.route.snapshot.paramMap.get('id')!;
    this.governmentService.getGovernmentById(this.id).subscribe({
      next:(data)=>{ this.gov = data},
      error:(err)=>{console.log("error",err)},
    });

    }
    
    trackByIndex(index:number , item:string){
          return index;
    }

    AddCity(){
      const myCity = this.newCity.trim();
      if(myCity){
        this.gov.listCities = [...this.gov.listCities , myCity]
        // this.gov.listCities.push(myCity);
        this.newCity = '';
      }
    }

   removeCity(index:number){
    this.gov.listCities.splice(index,1)
   }

   saveChanges(){
    this.governmentService.updateGovernment(this.id, this.gov).subscribe({
      next:()=>{
        this.toastr.success("Updated Successfully!",'success')
    this.router.navigate(['settings/government'])
      },
      error:(err)=>{
        this.toastr.error("Failed Update",'error')
        console.log("error",err)
      }
    });
    
   }
  
  }




