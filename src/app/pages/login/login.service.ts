import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _url = 'http://localhost:3000';

  private get _token() {
    return localStorage.getItem('token')!;
  }

  private set _token(v: string) {
    localStorage.setItem('token', v);
  }

  private _tokenSub = new BehaviorSubject<string>(this._token);
  public token$ = this._tokenSub.asObservable();

  isConnected$ = this.token$.pipe(
    map((v) => !!v),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  private checkToken(token: string) {
    return this.http.get<any[]>(`${this._url}/users?token=${token}`);
  }

  private getUser(username: string, password: string) {
    return this.http.get<any[]>(
      `${this._url}/users?username=${username}&password=${password}`
    );
  }

  login(username: string, password: string) {
    return this.getUser(username, password).pipe(
      tap((result) => {
        if (result[0]) {
          const token = result[0].token;
          this._token = token;
          this._tokenSub.next(token);
        }
      }),
      map((results) => results?.length === 1),
      switchMap((success) =>
        success ? of(true) : throwError(() => new Error('User not found'))
      )
    );
  }

  logout() {
    this._delete();
    this._tokenSub.next(undefined!);
  }

  private _delete() {
    localStorage.removeItem('token');
  }
}
