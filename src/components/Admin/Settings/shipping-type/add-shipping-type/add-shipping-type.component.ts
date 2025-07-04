import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShippingTypeService } from '../../../../../services/admin/shipping-type.service';
import { ShippingType } from '../../../../../models/shippingType';

@Component({
  selector: 'app-add-shipping-type',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './add-shipping-type.component.html',
  styleUrl: './add-shipping-type.component.css'
})
export class AddShippingTypeComponent {
newShippingType: ShippingType= {
  id: 0,
  shippingTypeName: '',
  shippingPrice: 0
};



constructor(private shippingTypeService: ShippingTypeService, private router: Router) {}
AddShippingType() {
  this.shippingTypeService.createShippingType(this.newShippingType).subscribe(
    (response) => {
      console.log('Shipping type added successfully:', response);

      // Handle success (e.g., navigate back or show a success message)
      this.newShippingType = { id: 0, shippingTypeName: '', shippingPrice: 0 }; // Reset form

      this.router.navigate(['/dashboard/shipping-type']);
    },
    (error) => {
      console.error('Error adding shipping type:', error);
      // Handle error (e.g., show an error message)
    }
  );
}
}
