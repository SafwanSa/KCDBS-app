import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  loading = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    this.loading = true;
    this.authService.signIn(this.email.value, this.password.value).subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/');
      }
      this.loading = false;
    }, error => {
      this.serverMessage = error;
      this.loading = false;
    });
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
