import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hidePassword = true;
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  onSubmit(): void {
    this.authService.signIn(this.email.value, this.password.value);
  }

  getErrorMessage(): string {
    if (this.password.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    else if (this.email.hasError('required')
      || this.password.hasError('required')) {
      return 'You must enter a value';
    } else if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
  }

}
