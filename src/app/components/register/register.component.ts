import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get firstName(): any {
    return this.form.get('firstName');
  }

  get lastName(): any {
    return this.form.get('lastName');
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  getErrorMessage(): string {
    if (this.password.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    else if (this.email.hasError('required')
      || this.firstName.hasError('required')
      || this.lastName.hasError('required')
      || this.password.hasError('required')) {
      return 'You must enter a value';
    } else if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
  }

  async onSubmit(): Promise<void> {
    this.loading = true;

    this.loading = false;
  }
}
