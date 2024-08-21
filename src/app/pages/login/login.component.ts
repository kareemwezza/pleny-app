import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMsg: string | undefined;
  formGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (auth.isLoggedIn) {
      router.navigate(['/']);
    }
  }

  loginUser() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const { username, password } = this.formGroup.getRawValue();
    this.auth.authenticate(username, password).subscribe({
      next: () => {
        this.errorMsg &&= undefined;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMsg = err.message;
      }
    });
  }
}
