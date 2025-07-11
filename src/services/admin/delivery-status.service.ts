import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryStatusService {
  constructor(private http: HttpClient) {}
  getDeliveryStats() {
    return this.http.get<any[]>(
      'https://localhost:7109/api/DeliveryStatistics/order-status-count'
    );
  }

  changeOrderStatus(
    orderId: number,
    newStatusId: number,
    cancellationNote: string | null = null
  ) {
    return this.http.put(
      'https://localhost:7109/api/DeliveryStatistics/change-status',
      {
        orderId,
        newStatusId,
        cancellationNote,
      }
    );
  }
}
