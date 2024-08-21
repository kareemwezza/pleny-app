import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, lastValueFrom, tap, throwError } from 'rxjs';
import { env } from '@env/environment';
import { IUser } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    return this.isLoggedIn$.getValue();
  }

  private get token() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token ? JSON.parse(token) : '';
  }

  private get refreshToken() {
    const token = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    return token ? JSON.parse(token) : '';
  }

  authenticate(username: string, password: string) {
    return this.http.post<IUser>(`${env.apiUrl}/auth/login`, {
      username, password, expiresInMins: 2
    }).pipe(
      catchError(err => {
        console.error(err);
        this.isLoggedIn$.next(false);
        return throwError(() => ({ status: err.status, message: err.error.message }));
      }),
      tap(async data => {
        this.isLoggedIn$.next(true);
        this.saveAuthToken(data.token, data.refreshToken);
        localStorage.setItem('userId', JSON.stringify(data.id));
      })
    );
  }

  async getProfile() {
    return this.http.get<IUser>(`${env.apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  async initializeAuthUser() {
    if (this.isValidToken(this.token)) {
      this.isLoggedIn$.next(true);
      return;
    }
    if (this.refreshToken && this.isValidToken(this.refreshToken)) {
      const response = await lastValueFrom(this.refreshExpiredToken(this.refreshToken));
      this.saveAuthToken(response.token, response.refreshToken);
      this.isLoggedIn$.next(true);
      return;
    }
    this.isLoggedIn$.next(false);
    this.clearAuthTokens();
  }

  async logUserOut() {
    this.isLoggedIn$.next(false);
    this.clearAuthTokens();
  }

  private saveAuthToken(token: string, refreshToken: string) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    localStorage.setItem(this.REFRESH_TOKEN_KEY, JSON.stringify(refreshToken));
  }

  private clearAuthTokens() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * check if the token is valid and not expired
   * @param token
   */
  private isValidToken(token: string | null) {
    if (token) {
      try {
        const decode = this.decodeToken(token);
        if (Date.now() < decode.exp * 1000) {
          return true;
        }
      } catch {
        return false;
      }
    }
    return false;
  }

  /**
   * parse jwt encoded value to get details
   * @param token
   */
  private decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  private refreshExpiredToken(refreshToken: string) {
    return this.http.post<Record<'token' | 'refreshToken', string>>(
      `${env.apiUrl}/auth/refresh`,
      { refreshToken: refreshToken, expiresInMins: 1 }
    );
  }
}
