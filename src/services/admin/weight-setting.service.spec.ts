import { TestBed } from '@angular/core/testing';

import { WeightSettingService } from './weight-setting.service';

describe('WeightSettingService', () => {
  let service: WeightSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
