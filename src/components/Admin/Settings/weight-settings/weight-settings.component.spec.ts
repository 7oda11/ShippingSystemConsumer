import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightSettingsComponent } from './weight-settings.component';

describe('WeightSettingsComponent', () => {
  let component: WeightSettingsComponent;
  let fixture: ComponentFixture<WeightSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
