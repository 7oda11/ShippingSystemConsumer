import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule  } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  imports: [RouterModule,CommonModule ],
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.css'
})
export class TopnavbarComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
   this.userName = localStorage.getItem('username') || '';
    console.log("User Name:", this.userName);
  }

userName:string=''
  ngOnInit(): void {
    setTimeout(() => {
    this.userName = localStorage.getItem('username') || '';
    console.log("Loaded username:", this.userName);
  }, 200); 
  
  }
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
  @Input() isLeftSidebarCollapsed!: boolean;
} 
//  @Input() isLeftSidebarCollapsed!: boolean;
//   @Input() screenWidth!: number;
// @Input() isLeftSidebarCollapsed: boolean = false;


