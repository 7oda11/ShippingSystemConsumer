import { ToastrService } from 'ngx-toastr';
import { Government } from './../../../../../models/Governmernt';
import { Component, OnInit, ElementRef, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GovernmentService } from '../../../../../services/GovernmentServise';


@Component({
  selector: 'app-government-details',
  imports :[CommonModule , FormsModule ,RouterModule],
  templateUrl: './government-details.component.html',
  styleUrls: ['./government-details.component.css']
})
export class GovernmentDetailsComponent implements OnInit {
government!:Government
id!:string
selectedId:string| null =null;
@ViewChild('closeModalBtn')closeModalBtn!:ElementRef;
  constructor(private governmentService: GovernmentService , private route :ActivatedRoute , private toastr:ToastrService , private router: Router) { }

  ngOnInit() {
     const id  = this.route.snapshot.paramMap.get('id');
     if(id){
      this.governmentService.getGovernmentById(id).subscribe({
        next:(data)=>{this.government= data},
        error: (err)=>{console.log("error",err)}

      })
     }


  }
  selectedGovId(id:string){
this.selectedId = id;
  }

confirmDelete(){
if(this.selectedId){
   this.governmentService.deleteGovernment(this.selectedId).subscribe({
    next:()=>{this.toastr.success("Deleted Success",'success')
      this.closeModalBtn.nativeElement.click()
      this.router.navigate(['settings/government'])

    },
    error: (err)=>{console.log("error",err)}
  })
}

}
}
