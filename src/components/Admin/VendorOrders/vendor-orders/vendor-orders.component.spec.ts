/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VendorOrdersComponent } from './vendor-orders.component';

describe('VendorOrdersComponent', () => {
  let component: VendorOrdersComponent;
  let fixture: ComponentFixture<VendorOrdersComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
