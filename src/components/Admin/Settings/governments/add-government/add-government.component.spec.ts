/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddGovernmentComponent } from './add-government.component';

describe('AddGovernmentComponent', () => {
  let component: AddGovernmentComponent;
  let fixture: ComponentFixture<AddGovernmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGovernmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
