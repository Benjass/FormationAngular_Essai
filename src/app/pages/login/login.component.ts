import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, first, take, takeUntil } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = this.fb.group({
    username: ['', [Validators.required, isUsernameAdmin]],
    password: ['', [Validators.required]],
  });

  constructor(
    private service: LoginService,
    private fb: FormBuilder,
    private snacker: MatSnackBar,
    private router: Router
  ) {
    this.service.isConnected$
      .pipe(
        first(),
        filter((v) => v)
      )
      .subscribe(() => this.router.navigateByUrl('/series'));
  }

  login() {
    if (!this.form.valid) return;

    const { username, password } = this.form.value as any;

    this.service.login(username, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/series');
      },
      error: () => {
        this.snacker.open('Invalid password', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}

function isUsernameAdmin(control: AbstractControl) {
  if (control.value === 'admin') return null;
  else return { admin: true };
}
