/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { OrderdashboardService } from './orderdashboard.service';

describe('Service: Orderdashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderdashboardService]
    });
  });

  it('should ...', inject([OrderdashboardService], (service: OrderdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
