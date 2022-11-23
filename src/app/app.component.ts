import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './pages/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isConnected$ = this.service.isConnected$;

  constructor(private service: LoginService, private router: Router) {}

  logout() {
    this.service.logout();
    this.router.navigateByUrl('/login');
  }
}
