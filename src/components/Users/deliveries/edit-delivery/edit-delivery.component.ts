import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from '../../../../services/admin/delivery.service';
import { CityService } from '../../../../services/admin/city.service';
import { ToastrService } from 'ngx-toastr';
import { Delivery } from '../../../../models/delivery';
import { CityName } from '../../../../models/CityName';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateDelivey } from '../../../../models/update-delivey';

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrl: './edit-delivery.component.css',
  imports: [CommonModule, FormsModule],
})
export class EditDeliveryComponent implements OnInit {
  showPassword: boolean = false;

  delivery: UpdateDelivey = {
    id: 0,
    email: '',
    name: '',
    phone: '',
    cityId: 0,
    cityName: '',
  };

  id!: string;
  cities: CityName[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getDeliveryById();
    this.loadCities();
  }

  getDeliveryById() {
    this.deliveryService.getDeliveryById(Number(this.id)).subscribe({
      next: (res) => {
        this.delivery = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadCities() {
    this.cityService.getCities().subscribe({
      next: (res) => {
        this.cities = res;
      },
      error: (err) => {
        console.log('Error loading cities', err);
      },
    });
  }

  saveChanges(form: any) {
    if (form.valid) {
      this.deliveryService.updateDelivery(this.delivery).subscribe({
        next: () => {
          this.toastr.success('Delivery updated successfully!', 'Success');
          this.router.navigate(['/dashboard/deliveries']);
        },
        error: (err) => {
          console.log('Error updating delivery', err);
          this.toastr.error('Failed to update delivery', 'Error');
        },
      });
    }
  }
}
