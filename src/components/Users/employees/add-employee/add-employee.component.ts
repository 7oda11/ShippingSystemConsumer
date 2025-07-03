import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Employee } from '../../../../models/Employee';
import { EmployeeService } from '../../../../services/admin/employee.service';
import { BranchService } from '../../../../services/admin/branch.service';
import { Branch } from '../../../../models/Branch';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  branches: Branch[] = [];
  newEmployee:Employee = {
    email: '',
    fullName: '',
    userName: '',
    password: '',
    branchId: 0,
    id: 0
  };

  constructor(private employeeService: EmployeeService, private branchService: BranchService, private router: Router) {}
  ngOnInit(): void {
     this.loadBranches();

  }

addEmployee() {
  if (this.newEmployee.branchId === 0) {
    alert('Please select a branch.');
    return;
  }

  this.employeeService.addEmployee(this.newEmployee).subscribe({
    next: (response) => {
      console.log('Employee added successfully:', response);
      this.newEmployee = {
        email: '',
        fullName: '',
        userName: '',
        password: '',
        branchId: 0,
        id: 0
      };
      this.router.navigate(['/dashboard/employees']);
    },
    error: (error) => {
      console.error('Error adding employee:', error);
      if (error.status === 400) {
        const validationErrors = error.error;
        if (Array.isArray(validationErrors)) {
          validationErrors.forEach((e: any) => {
            console.warn('Validation error:', e);
          });
        } else if (validationErrors?.errors) {
          console.table(validationErrors.errors);
        }
      }
      alert('Failed to add employee. Please try again.');
    }
  });
}


  loadBranches(): void {
  this.branchService.gitBranches().subscribe(
    (data) => {
      this.branches = data;
      console.log('Loaded branches:', this.branches);
    },
    (error) => {
      console.error('Error fetching branches:', error);
    }
  );
}

}
