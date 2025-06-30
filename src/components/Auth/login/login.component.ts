import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../services/Auth/auth-service.service';
import { AuthResponse } from '../../../models/AuthResponse';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  showPassword: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.error(
        'Please fill in all required fields.',
        'Validation Error'
      );
      return;
    }
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (response: AuthResponse) => {
        this.toastr.success('Login successful!', 'Success');
        this.router.navigate(['/dashboard']);
        console.log(response);
        // handle successful login (e.g., redirect, store token, etc.)
      },
      error: (error) => {
        this.toastr.error(
          error?.error?.message ||
            'Login failed. Please check your credentials.',
          'Error'
        );
      },
    });
  }
}
