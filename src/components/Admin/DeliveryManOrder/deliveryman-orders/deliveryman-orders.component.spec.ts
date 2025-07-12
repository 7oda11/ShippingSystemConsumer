/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeliverymanOrdersComponent } from './deliveryman-orders.component';

describe('DeliverymanOrdersComponent', () => {
  let component: DeliverymanOrdersComponent;
  let fixture: ComponentFixture<DeliverymanOrdersComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverymanOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverymanOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
