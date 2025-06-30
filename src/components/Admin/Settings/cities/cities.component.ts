import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CityService } from '../../../../services/admin/city.service';
import Swal from 'sweetalert2';
import { City } from '../../../../models/City';
import { Government } from '../../../../models/Governmernt';

// Add this line to let TypeScript know about the global 'bootstrap' variable
declare var bootstrap: any;


@Component({
  selector: 'app-cities',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']  // ✅ fixed typo
})
export class CitiesComponent implements OnInit {
  cities: City[] = [];
   selectedCity: City = {
     id: '0', name: '', price: 0, pickedPrice: 0, govName: '',
     governmentId: ''
   };

   governments: Government[] = [];
   selectedGovId: string | null = null;



  /**
   *
   */
  constructor(private cityService: CityService) { }
  ngOnInit(): void {
    this.getCities();
     this.getGovernments();
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
 
  getGovernments() {
    this.cityService.getGovernments().subscribe( {
     next: (data) => {
       this.governments = data.map((item: any) => ({
         id: item.id,
         name: item.name,
         listCities: item.listCities ?? []
       }));
     },
      error: (err) => {
        console.error('Error fetching governments:', err);
        alert('Failed to load governments. Please try again later.');
      }
    });
  }

 
  //update branch
updateCity() {
  // ✅ Set govName based on selected ID before calling API
  const selectedGov = this.governments.find(g => g.id == this.selectedCity.governmentId);
  this.selectedCity.govName = selectedGov ? selectedGov.name : '';

  console.log('Sending data to API:', this.selectedCity);

  this.cityService.updateCity(this.selectedCity).subscribe({
    next: (res) => {
      console.log('Updated:', res);
      this.getCities();

      const modalElement = document.getElementById('editModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    },
    error: (err) => {
      console.error('Update failed:', err);
      alert('Failed to update city');
    }
  });
}



  openEditModal(city: any) {
    this.selectedCity = { ...city };
    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }

  ngAfterViewInit() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
