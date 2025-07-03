import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingTypeComponent } from './add-shipping-type.component';

describe('AddShippingTypeComponent', () => {
  let component: AddShippingTypeComponent;
  let fixture: ComponentFixture<AddShippingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShippingTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShippingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
