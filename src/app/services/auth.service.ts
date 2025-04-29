import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5288/api/Authentication/authentication';
  private jwtHelper = new JwtHelperService();
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  login(credentials: { emailAddress: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('jwt_token', token);
      this.authState.next(true);
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('jwt_token');
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.authState.next(false);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  getEmail(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.email : null;
  }

  getCustomerId(): number | null {
    const decodedToken = this.getDecodedToken();
    console.log(decodedToken);
    return decodedToken ? decodedToken.nameid : null;
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
