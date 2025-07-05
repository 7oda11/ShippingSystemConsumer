import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Delivery } from '../../../../models/delivery';
import { DeliveryService } from '../../../../services/admin/delivery.service';
import { CityService } from '../../../../services/admin/city.service';
import { CityName } from '../../../../models/CityName';
@Component({
  selector: 'app-add-delivery',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './add-delivery.component.html',
  styleUrl: './add-delivery.component.css',
})
export class AddDeliveryComponent {
  cityName: CityName[] = [];
  newDelivery: Delivery = {
    email: '',
    fullName: '',
    userName: '',
    password: '',
    cityId: 0,
    name: '',
    phone: '',
    id: 0,
  };

  constructor(
    private deliveryService: DeliveryService,
    private cityService: CityService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadcities();
  }

  addDelivery() {
    if (this.newDelivery.cityId === 0) {
      alert('Please select a city.');
      return;
    }

    this.deliveryService.addDelivery(this.newDelivery).subscribe({
      next: (response) => {
        console.log('Delivery added successfully:', response);
        this.newDelivery = {
          email: '',
          fullName: '',
          userName: '',
          password: '',
          cityId: 0,
          id: 0,
          name: '',
          phone: '',
        };
        this.router.navigate(['/dashboard/deliveries']);
      },
      error: (error) => {
        console.error('Error adding deliveryh:', error);
        if (error.status === 400) {
          const validationErrors = error.error;
          if (Array.isArray(validationErrors)) {
            validationErrors.forEach((e: any) => {
              console.warn('Validation error:', e);
            });
          } else if (validationErrors?.errors) {
            console.table(validationErrors.errors);
          }
        }
        alert('Failed to add deliverey. Please try again.');
      },
    });
  }

  loadcities(): void {
    this.cityService.getCities().subscribe(
      (data) => {
        this.cityName = data;
        console.log('Loaded cities:', this.cityName);
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }
}
