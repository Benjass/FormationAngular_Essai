import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, first } from 'rxjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './pages/login/login.service';

describe('AppComponent', () => {
  let service: LoginService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: '', redirectTo: 'login', pathMatch: 'prefix' },
        ]),
        HttpClientTestingModule,
        MatToolbarModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(LoginService);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('Logout function', () => {
    it('Should call service.logout', () => {
      service.logout = jasmine.createSpy().and.callFake(() => {});
      app.logout();
      expect(service.logout).toHaveBeenCalledOnceWith();
    });

    it('Should call router.navigateByUrl', () => {
      const router = TestBed.inject(Router);
      router.navigateByUrl = jasmine.createSpy();
      app.logout();
      expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/login');
    });
  });

  describe('isConnected$', () => {
    const sub = new BehaviorSubject<boolean>(false);

    beforeEach(() => {
      service.isConnected$ = sub.asObservable();
      app.isConnected$ = service.isConnected$;
      sub.next(false);
    });

    it('Should be true when connected', (done) => {
      sub.next(true);
      app.isConnected$.pipe(first()).subscribe((v) => {
        expect(v).toBeTruthy();
        done();
      });
    });
  });
});
