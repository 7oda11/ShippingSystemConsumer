import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CityService } from '../../../../../services/admin/city.service';

@Component({
  selector: 'app-add-city',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})
export class AddCityComponent implements OnInit {
  newCity = {
    name: '',
    price: 0,
    pickedPrice: 0,
    governmentId: 0,
    govName: ''
  };
  governments: any[] = [];
  selectedGovId: number | null = null;
  
  constructor(private cityService: CityService, private router: Router) { }


  getGovernments() {
    this.cityService.getGovernments().subscribe( {
     next:(data)=> this.governments = data,
      error: (err) => {
        console.error('Error fetching governments:', err);
        alert('Failed to load governments. Please try again later.');
      }
    });
  }

addCity() {
  if (!this.newCity.name || !this.newCity.price || !this.newCity.pickedPrice || !this.selectedGovId) {
    alert('Please fill in all fields');
    return;
  }

  this.newCity.governmentId = this.selectedGovId;

  // ✅ ضيف السطر ده هنا مباشرة قبل الإرسال
  // const selectedGov = this.governments.find(g => g.id === this.selectedGovId);
  // this.newCity.govName = selectedGov ? selectedGov.name : '';

  console.log('City to submit:', this.newCity); // ✅ تأكد من هنا

  this.cityService.createCity(this.newCity).subscribe({
    next: (response) => {
      console.log('City added successfully:', response);
      this.router.navigate(['/settings/cities']);
    },
    error: (error) => {
      console.error('Error adding city:', error);
      alert('Failed to add city. Please try again.');
    }
  });
}

onGovernmentChange() {
  const selectedGov = this.governments.find(g => g.id === this.selectedGovId);
  this.newCity.govName = selectedGov ? selectedGov.name : '';
}


  ngOnInit() {
    this.getGovernments();
  }
}
