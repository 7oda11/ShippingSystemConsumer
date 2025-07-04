import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CityService } from '../../../../../services/admin/city.service';
import { City } from '../../../../../models/City';
import { Government } from '../../../../../models/Governmernt';

@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css',
})
export class AddCityComponent implements OnInit {
  newCity: City = {
    name: '',
    price: 0,
    pickedPrice: 0,
    governmentId: '',
    govName: '',
  };

  governments: Government[] = [];
  selectedGovId: string | null = null;

  constructor(private cityService: CityService, private router: Router) {}

  ngOnInit(): void {
    this.getGovernments();
  }

  getGovernments() {
    this.cityService.getGovernments().subscribe({
      next: (data) => {
        this.governments = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          listCities: item.listCities ?? [],
        }));
      },
      error: (err) => {
        console.error('Error fetching governments:', err);
        alert('Failed to load governments. Please try again later.');
      },
    });
  }

  onGovernmentChange() {
    const selectedGov = this.governments.find(
      (g) => g.id === this.selectedGovId
    );
    this.newCity.govName = selectedGov ? selectedGov.name : '';
  }

  addCity() {
    if (
      !this.newCity.name ||
      !this.newCity.price ||
      !this.newCity.pickedPrice ||
      !this.selectedGovId
    ) {
      alert('Please fill in all fields');
      return;
    }

    this.newCity.governmentId = this.selectedGovId!;

    console.log('City to submit:', this.newCity);

    this.cityService.createCity(this.newCity).subscribe({
      next: (response) => {
        console.log('City added successfully:', response);
        this.router.navigate(['/dashboard/cities']);
      },
      error: (error) => {
        console.error('Error adding city:', error);
        alert('Failed to add city. Please try again.');
      },
    });
  }
}
