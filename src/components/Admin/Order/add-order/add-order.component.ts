import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/admin/order.service';
import { AddOrder } from '../../../../models/Order';
import Swal from 'sweetalert2';
import { GovernmentName } from '../../../../models/GovernmentName';
import { GovernmentService } from '../../../../services/admin/GovernmentServise';
import { CityService } from '../../../../services/admin/city.service';
import { City } from '../../../../models/City';
import { ShippingType } from '../../../../models/shippingType';
import { ShippingTypeService } from '../../../../services/admin/shipping-type.service';
import { orderStatus } from '../../../../../enums/orderStatus';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  orderForm!: FormGroup;
  governmentNames: GovernmentName[] = [];
  cities: City[] = [];
  ShippingTypes: ShippingType[] = [];
  orders:AddOrder[]=[];


  
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private governmentService: GovernmentService,
    private cityService: CityService,
    private shippingTypeService: ShippingTypeService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\sأ-ي]{3,}$/)]],
      customerPhone1: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
      customerPhone2: ['', [Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
      email: ['', [Validators.email]],
      governmentId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      isShippedToVillage: [false],
      villageName: [{ value: '', disabled: true }, [Validators.required]],
      shippingTypeId: ['', [Validators.required]],
      vendorName: [''],
      vendorAddress: ['', [Validators.required]],
      totalPrice: [0, [Validators.required, Validators.min(0)]],
      notes: [''],
      status: [''],
      statusId: orderStatus.Pending,
      totalWeight: [0, [Validators.required, Validators.min(0)]],
      orderItems: this.fb.array([this.createProductRow()])
    });

    this.orderForm.get('isShippedToVillage')?.valueChanges.subscribe((value: boolean) => {
      const villageControl = this.orderForm.get('villageName');
      if (value === true) {
        villageControl?.enable();
        villageControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[A-Za-z\sأ-ي]{3,}$/)
        ]);
      } else {
        villageControl?.disable();
        villageControl?.clearValidators();
        villageControl?.setValue('');
      }
      villageControl?.updateValueAndValidity();
    });

    this.loadGovernorates();
    this.getShippingTypes();
    
  }

  get orderItems(): FormArray {
    return this.orderForm.get('orderItems') as FormArray;
  }

  createProductRow(): FormGroup {
    return this.fb.group({
      productName: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  addProduct(): void {
    this.orderItems.push(this.createProductRow());
  }

  removeProduct(index: number): void {
    this.orderItems.removeAt(index);
  }


  submit(): void {

const govId = this.orderForm.get('governmentId')?.value;
const cityId = this.orderForm.get('cityId')?.value;
const shippingTypeId = this.orderForm.get('shippingTypeId')?.value;

if (!govId) {
  Swal.fire('Validation Error', 'Please select a governorate.', 'warning');
  return;
}

if (!cityId) {
  Swal.fire('Validation Error', 'Please select a city.', 'warning');
  return;
}

if (!shippingTypeId) {
  Swal.fire('Validation Error', 'Please select a shipping type.', 'warning');
  return;
}
  const formData: AddOrder = this.orderForm.value;

  // ✅ Calculate total weight and total price from orderItems
  const orderItems = formData.orderItems;
  if (!orderItems || orderItems.length === 0) {
    Swal.fire('Validation Error', 'Order must contain at least one item.', 'error');
    return;
  }

  const calculatedWeight = orderItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  const calculatedPrice = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  

  if (formData.totalPrice !== calculatedPrice) {
    Swal.fire('Validation Error', 'Total price does not match the sum of item prices.', 'error');
    return;
  }
if ((formData.totalWeight ?? 0) <= 0 || (formData.totalWeight ?? 0) !== calculatedWeight) {
    Swal.fire('Validation Error', 'Total weight is invalid or incorrect.', 'error');
    return;
  }
  // ✅ All validations passed, submit the order
  this.orderService.addOrder(formData).subscribe({
    next: () => {
      Swal.fire('Success', 'Order created successfully', 'success');
      this.orderForm.reset();
      this.orderItems.clear();
      this.orderItems.push(this.createProductRow());
    },
    error: (error) => {
      console.error('Error submitting order:', error.error);

      if (error.error && typeof error.error === 'object') {
        const validationMessages = Object.values(error.error).flat();
        Swal.fire('Validation Error', validationMessages.join('<br>'), 'error');
      } else {
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    }
  });
}


  loadGovernorates(): void {
    this.governmentService.getAllGovernments().subscribe({
      next: (data) => (this.governmentNames = data),
      error: (err) => console.error('Error loading governments:', err)
    });
  }

  onGovernmentChange(): void {
    const selectedGovId = this.orderForm.get('governmentId')?.value;
    if (selectedGovId) {
      this.cityService.getCitiesByGovernmentId(selectedGovId).subscribe({
        next: (data) => (this.cities = data),
        error: (err) => console.error('Error loading cities:', err)
      });
    } else {
      this.cities = [];
    }
    this.orderForm.get('cityId')?.setValue('');
  }

  getShippingTypes(): void {
    this.shippingTypeService.getShippingTypes().subscribe({
      next: (data) => (this.ShippingTypes = data),
      error: (err) => console.error('Error loading shipping types:', err)
    });
  }

 
}
