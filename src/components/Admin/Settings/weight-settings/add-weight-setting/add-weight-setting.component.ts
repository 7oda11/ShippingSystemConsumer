import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WeightSettingService } from '../../../../../services/admin/weight-setting.service';
import { WeightSetting } from '../../../../../models/weight-setting';

@Component({
  selector: 'app-add-weight-setting',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-weight-setting.component.html',
  styleUrl: './add-weight-setting.component.css',
})
export class AddWeightSettingComponent {
  newWeightSetting: WeightSetting = {
    weightRange: '',
    extraPrice: '',
  };

  constructor(
    private weightSettingService: WeightSettingService,
    private router: Router
  ) {}

  addWeightSetting() {
    if (
      !this.newWeightSetting.weightRange ||
      !this.newWeightSetting.extraPrice
    ) {
      alert('Please fill in all fields');
      return;
    }

    this.weightSettingService
      .addWeightSetting(this.newWeightSetting)
      .subscribe({
        next: (response) => {
          console.log('Weight Setting added successfully:', response);
          this.router.navigate(['/dashboard/weightSetting']);
        },
        error: (error) => {
          console.error('Error adding weight setting:', error);
          alert('Failed to add weight setting. Please try again.');
        },
      });
  }
}
