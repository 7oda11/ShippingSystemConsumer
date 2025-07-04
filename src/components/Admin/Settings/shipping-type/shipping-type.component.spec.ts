import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingTypeComponent } from './shipping-type.component';

describe('ShippingTypeComponent', () => {
  let component: ShippingTypeComponent;
  let fixture: ComponentFixture<ShippingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
