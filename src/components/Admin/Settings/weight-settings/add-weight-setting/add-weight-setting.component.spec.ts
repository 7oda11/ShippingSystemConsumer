import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightSettingComponent } from './add-weight-setting.component';

describe('AddWeightSettingComponent', () => {
  let component: AddWeightSettingComponent;
  let fixture: ComponentFixture<AddWeightSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWeightSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWeightSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
