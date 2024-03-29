import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserLogin, UserRegister } from '../models/i-user-dto';
import { IConfirmRes } from '../models/i-confirm-res';
import { Observable } from 'rxjs';
import { IUser } from '../models/i-user';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const role = localStorage.getItem('userRole');
      return role === 'ADMIN'; // Check if the role is 'ADMIN' instead of 'admin'
    }
    return false; // Assume not admin if not in browser environment
}




  private baseUrl = 'http://localhost:8080';

  register(user: UserRegister): Observable<IUser> {
    // Registration logic remains unchanged
    return this.http.post<any>(`${this.baseUrl}/api/auth/register`, user);
  }

  login(credentials: UserLogin): Observable<IConfirmRes> {
    return this.http.post<IConfirmRes>(`${this.baseUrl}/api/auth/login`, credentials).pipe(
      tap((response: IConfirmRes) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          console.log('Token stored:', response.token);

          // Decode the token to get the role
          const decodedToken = this.decodeToken(response.token);
          if (decodedToken && decodedToken.role) { // Assuming the role is stored with the key 'role'
            localStorage.setItem('userRole', decodedToken.role); // Store the role
          }
        }
      })
    );
  }

  logout(): Observable<any> {
    // Rimuovi il token di autenticazione e il ruolo dell'utente dalla localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');

    // Effettua la chiamata al backend per il logout
    return this.http.post<any>(`${this.baseUrl}/api/auth/logout`, {});
  }



// Decode token, *for the for admin/user permissions*
  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('authToken');
      return authToken !== null; // Return true if authToken exists, indicating the user is logged in
    }
    return false; // Return false if not in a browser environment
  }

}
