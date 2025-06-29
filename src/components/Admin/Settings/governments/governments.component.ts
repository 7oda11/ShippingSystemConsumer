import { Government } from '../../../../models/Governmernt';
import { GovernmentService } from './../../../../services/GovernmentServise';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-governments',
  imports: [CommonModule, RouterLink],
  templateUrl: './governments.component.html',
  styleUrl: './governments.component.css'
})
export class GovernmentsComponent implements OnInit {

  governments:Government[] = [];
  constructor(private governmentservice:GovernmentService){}
  ngOnInit(): void {
     this.governmentservice.getAllGovernments().subscribe({
      next: (data) => this.governments = data,
      error:(err)=> console.log(" there is Error",err),
      complete:()=> console.log("All governments loaded successfully")
    });


  }

}
