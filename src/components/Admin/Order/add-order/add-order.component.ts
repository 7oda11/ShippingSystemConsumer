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
import { VendorServiceService } from '../../../../services/VendorService.service';
import { Vendor } from '../../../../models/Vendor';

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
  orders: AddOrder[] = [];
  vendors:Vendor[]=[];
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private governmentService: GovernmentService,
    private cityService: CityService,
    private shippingTypeService: ShippingTypeService,
    private vendorService:VendorServiceService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\sأ-ي]{3,}$/)]],
      customerPhone1: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
      customerPhone2: ['', [Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
      email: ['', [Validators.email]],
      governmentId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      isShippedToVillage: [false],
      address: ['', [Validators.required]],
      shippingTypeId: ['', [Validators.required]],
      vendorName: ['',[Validators.required]],
      vendorAddress: ['', [Validators.required]],
      totalPrice: [0, [Validators.required, Validators.min(0)]],
      notes: [''],
      status: [''],
      statusId: orderStatus.Pending,
      totalWeight: [0, [Validators.required, Validators.min(0)]],
      orderItems: this.fb.array([this.createProductRow()])
    });

    this.orderForm.get('totalPrice')?.disable();
    this.orderForm.get('totalWeight')?.disable();
    this.loadGovernorates();
    this.getShippingTypes();
    this.getAllVendors();
    this.orderItems.valueChanges.subscribe(() => {
    this.calculateTotals();
    });
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
    this.calculateTotals();
  }

  removeProduct(index: number): void {
    if (this.orderItems.length === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Delete',
        text: 'At least one product is required in the order.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
    this.orderItems.removeAt(index);
    this.calculateTotals();
  }

  // calculateTotals(): void {
  //   let totalPrice = 0;
  //   let totalWeight = 0;

  //   const items = this.orderItems.controls;

  //   items.forEach((group: FormGroup) => {
  //     const quantity = +group.get('quantity')?.value || 0;
  //     const weight = +group.get('weight')?.value || 0;
  //     const price = +group.get('price')?.value || 0;

  //     totalPrice += quantity * price;
  //     totalWeight += quantity * weight;
  //   });

  //   this.orderForm.patchValue({
  //     totalPrice,
  //     totalWeight
  //   }, { emitEvent: false });
  // }
calculateTotals(): void {
  let totalPrice = 0;
  let totalWeight = 0;

  this.orderItems.controls.forEach(control => {
    const group = control as FormGroup;

    const quantity = +group.get('quantity')?.value || 0;
    const weight = +group.get('weight')?.value || 0;
    const price = +group.get('price')?.value || 0;

    totalPrice += quantity * price;
    totalWeight += quantity * weight;
  });

  this.orderForm.patchValue({
    totalPrice,
    totalWeight
  }, { emitEvent: false });
}

  submit(): void {
    const customerName = this.orderForm.get('customerName')?.value;
    const customerPhone1 = this.orderForm.get('customerPhone1')?.value;
    const customerPhone2 = this.orderForm.get('customerPhone2')?.value;
    const email = this.orderForm.get('email')?.value;
    const address = this.orderForm.get('address')?.value;
    const govId = this.orderForm.get('governmentId')?.value;
    const cityId = this.orderForm.get('cityId')?.value;
    const shippingTypeId = this.orderForm.get('shippingTypeId')?.value;
    const vendorName = this.orderForm.get('vendorName')?.value;
    // Manual required field validation
    if (!customerName || !customerPhone1 || !customerPhone2 || !email || !address || !govId || !cityId || !shippingTypeId || !vendorName) {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'warning');
      return;
    }

    const orderItems: { productName: string, quantity: number, weight: number, price: number }[] = this.orderItems.value;

    if (!orderItems || orderItems.length === 0) {
      Swal.fire('Validation Error', 'Order must contain at least one product.', 'error');
      return;
    }

    for (let i = 0; i < orderItems.length; i++) {
      const item = orderItems[i];
      if (!item.productName?.trim()) {
        Swal.fire('Validation Error', `Product name is required for item #${i + 1}.`, 'warning');
        return;
      }
      if (!item.quantity || item.quantity <= 0) {
        Swal.fire('Validation Error', `Quantity must be greater than 0 for item #${i + 1}.`, 'warning');
        return;
      }
      if (item.weight == null || item.weight < 0) {
        Swal.fire('Validation Error', `Weight must be 0 or more for item #${i + 1}.`, 'warning');
        return;
      }
      if (item.price == null || item.price < 0) {
        Swal.fire('Validation Error', `Price must be 0 or more for item #${i + 1}.`, 'warning');
        return;
      }

    }

    const formData: AddOrder = this.orderForm.getRawValue();

    const calculatedWeight = orderItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    const calculatedPrice = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if ((formData.totalWeight ?? 0) <= 0 || formData.totalWeight !== calculatedWeight) {
      Swal.fire('Validation Error', 'Total weight is invalid or incorrect.', 'error');
      return;
    }

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

  getAllVendors(){
    this.vendorService.getAllVendors().subscribe({
       next: (data) => (this.vendors = data),
      error: (err) => console.error('Error loading vendors :', err)
    })
  }

  onVendorChange(event: Event): void {
    
  const selectedVendorName = (event.target as HTMLSelectElement).value;
  const selectedVendor = this.vendors.find(v => v.name === selectedVendorName);

  if (selectedVendor) {
    this.orderForm.patchValue({
      vendorAddress: selectedVendor.address
    });
  } else {
    this.orderForm.patchValue({
      vendorAddress: ''
    });
  }
}

}
