import { Government } from '../../../../models/Governmernt';
import { GovernmentService } from './../../../../services/GovernmentServise';
import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {ElementRef , ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GovernmentName } from '../../../../models/GovernmentName';
import { from } from 'rxjs';
@Component({
  selector: 'app-governments',
  imports: [CommonModule, RouterLink ],
  templateUrl: './governments.component.html',
  styleUrl: './governments.component.css'
})
export class GovernmentsComponent implements OnInit {

  governments:Government[] = [];
  governmentNames: GovernmentName[]=[]
  selectedGovId:string| null =null;
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;

  constructor(private governmentservice:GovernmentService , private toasr:ToastrService , private router:Router){}
  ngOnInit(): void {
   
    this.loadGovernments();

  }

  loadGovernments(){
      this.governmentservice.getGovernmentNames().subscribe({
      next: (data) => this.governmentNames= data,
      error:(err)=> console.log(" there is Error",err),
      complete:()=> console.log("All governments loaded successfully")
    });
  }

  setSelectdGov(id:string){
      this.selectedGovId = id;
  }

  confirmDelete(){
      if(this.selectedGovId){
          this.governmentservice.deleteGovernment(this.selectedGovId).subscribe({
            next:()=>{
              this.toasr.success("Deleted Successfully!",'success'),
              this.closeModalBtn.nativeElement.click()
              this.loadGovernments();
           },
             error:(err)=>{
              this.toasr.error("Failed Delete",'error')
              console.log("error",err)
    }
  });
}
  }

}
