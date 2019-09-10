import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: number;
  username: string;
  email?: string;
  role: string;
  password?: string;
  exp: number;
}

export interface TokenPayload {
  _id: number;
  username: string;
  email?: string;
  role: string,
  exp: number;
}

export interface ServerResponse {
  'data': string;
  'err': string;
  'token'?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  public static isExpired(exp) {
    return (exp > Date.now() / 1000);
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    if (token) {
      let payload;
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user && user.username && user.role && user.exp) {
      return (user && user.role === 'admin' && (AuthenticationService.isExpired(user.exp)));
    } else {
      // console.log('AuthenticationService::isLoggedIn(), nicht eigeloggt.');
      return false;
    }
  }

  public isAdmin() : boolean {
    return (this.isLoggedIn() && this.getUserDetails().role === 'admin');
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    console.log('request, method: ', method, ' | type: ', type, ' | user: ', user);
    let base;
    let url = `/api/${type}`;

    if (method === 'post') {
      base = this.http.post(url, user);
    } else {
      base = this.http.get( url, { headers: { Authorization: `Bearer ${this.getToken()}` } } );
    }

    // Bei type=profile wird der ganze user zurückgegeben
    if(type === 'profile') {
      return base.pipe( map( (data: ServerResponse) => {
          if ( (data.data || data.token) && !data.err) {
            console.log('Inside AuthenticationService::request(..), profil erhalten', data);
          }
          return data;
        })
      );
    } else {
      // Bei allen anderen types wird jeweisl nur der token zurückgegeben
      return base.pipe( map( (data: ServerResponse) => {
          if ( (data.data || data.token) && !data.err) {
            console.log('Inside AuthenticationService::request(..), token erhalten, data: ', data);
            this.saveToken(data.token);
          }
          return data;
        })
      );
    }
  }

  public register(user: TokenPayload): Observable<any> {
    console.log('register in authentication.service.ts');
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    console.log('login in authentication.service.ts');
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
