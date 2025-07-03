import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../services/admin/employee.service';
import { Employee } from '../../../models/Employee';
import { Status } from '../../../models/Status';
import { BranchService } from '../../../services/admin/branch.service';
import { Branch } from '../../../models/Branch';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-employees',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  branches: Branch[] = [];
  employees: Employee[] = [];
  selectedEmployee: Employee = {
    id: 0,
    userName: '',
    password: '',
    email: '',
    fullName: '',
    branchId: 0
  };

  constructor(
    private employeeService: EmployeeService,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadBranches();
  }

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(tooltipTriggerEl => {
      // @ts-ignore
      return new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log('Loaded employees:', this.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  loadBranches(): void {
    this.branchService.gitBranches().subscribe(
      (data) => {
        this.branches = data;
      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }

  updateEmployee() {
    const payload: any = {
      id: this.selectedEmployee.id,
      fullName: this.selectedEmployee.fullName,
      email: this.selectedEmployee.email,
      userName: this.selectedEmployee.userName,
      branchId: this.selectedEmployee.branchId
    };

    if (this.selectedEmployee.password && this.selectedEmployee.password.trim() !== '') {
      payload.password = this.selectedEmployee.password;
    }

    this.employeeService.updateEmployee(payload).subscribe(
      (res) => {
        console.log('Updated:', res);
        this.loadEmployees();
        Swal.fire({
          title: 'Success!',
          text: 'Employee updated successfully.',
          icon: 'success',
          background: '#f8f9fa',
          color: '#155293',
          confirmButtonColor: '#198754',
          customClass: {
            popup: 'rounded-4 shadow',
            confirmButton: 'fw-bold px-4 py-2'
          }
        });
        const modalElement = document.getElementById('editModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement!);
        modalInstance.hide();
      },
      (error) => {
        console.error('Update failed:', error);
        console.error('Update failed:', error.error.errors);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while updating.',
          icon: 'error',
          background: '#fff3f3',
          color: '#d33',
          confirmButtonColor: '#d33'
        });
      }
    );
  }

  deleteEmployee(employee: Employee) {
    console.log('Deleting employee with ID:', employee.id);
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${employee.userName}"?`,
      icon: 'warning',
      background: '#f8f9fa',
      color: '#155293',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#155293',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-4 shadow',
        confirmButton: 'fw-bold px-4 py-2',
        cancelButton: 'fw-bold px-4 py-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(employee.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Employee has been deleted.',
              icon: 'success',
              background: '#f8f9fa',
              color: '#155293',
              confirmButtonColor: '#198754',
              customClass: {
                popup: 'rounded-4 shadow',
                confirmButton: 'fw-bold px-4 py-2'
              }
            });
            this.loadEmployees();
          },
          error: () => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong while deleting.',
              icon: 'error',
              background: '#fff3f3',
              color: '#d33',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }

  openEditModal(employee: Employee) {
    this.selectedEmployee = {
      ...employee,
      password: '', // Clear password field
      branchId: employee.branchId ? Number(employee.branchId) : 0
    };

    console.log('Selected branchId value:', this.selectedEmployee.branchId);
    console.log('Branch IDs in list:', this.branches.map(b => b.id));

    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }
}
