import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CityService } from '../../../../services/admin/city.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cities',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']  // ✅ fixed typo
})
export class CitiesComponent implements OnInit {
  cities: any[] = [];

  /**
   *
   */
  constructor(private cityService: CityService) { }
  ngOnInit(): void {
    this.getCities();
  }


  getCities() {
    this.cityService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
        console.log('Cities loaded:', data);
      },
      error: (err) => {
        console.error('Error fetching cities:', err);
      }
    });
  }


  onGovernmentChange(city: any) {
   
  }

 deleteCity(city: any) {
  console.log('Deleting city with id:', city.id);
   Swal.fire({
     title: 'Are you sure?',
     text: `Do you really want to delete "${city.name}"?`,
     icon: 'warning',
     background: '#f8f9fa', // خلفية فاتحة جدًا (رمادي أبيض)
     color: '#155293',      // نص كحلي غامق
     showCancelButton: true,
     confirmButtonColor: '#dc3545',  // أحمر فاتح
     cancelButtonColor: '#155293',   // كحلي
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'Cancel',
     customClass: {
       popup: 'rounded-4 shadow',
       confirmButton: 'fw-bold px-4 py-2',
       cancelButton: 'fw-bold px-4 py-2'
     }
   }).then((result) => {
     if (result.isConfirmed) {
       this.cityService.deleteCity(city.id).subscribe({
         next: () => {
           Swal.fire({
             title: 'Deleted!',
             text: 'Branch has been deleted.',
             icon: 'success',
             background: '#f8f9fa',
             color: '#155293',
             confirmButtonColor: '#198754', // أخضر لطيف
             customClass: {
               popup: 'rounded-4 shadow',
               confirmButton: 'fw-bold px-4 py-2'
             }
           });
           this.getCities();
         },
         error: () => {
           Swal.fire({
             title: 'Error!',
             text: 'Something went wrong while deleting.',
             icon: 'error',
             background: '#fff3f3',
             color: '#d33',
             confirmButtonColor: '#d33'
           });
         }
       });
     }
   });
 }
 
}
