import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: number;
  username: string;
  email: string;
  exp: number;
}

export interface TokenPayload {
  _id: number;
  username: string;
  email: string;
  exp: number;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

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
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public isAdmin() : boolean {
    console.log('isAdmin(), user: ', this.getUserDetails() );
    const user = this.getUserDetails();
    return (user && user.username === 'iwan' && (user.exp > Date.now() / 1000) );
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'home', user?: TokenPayload): Observable<any> {
    console.log('request, method: ', method, ' | type: ', type, ' | user: ', user);
    let base;
    if (method === 'post') {
      base = this.http.post(`/${type}`, user);
    } else {
      base = this.http.get(`/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    console.log('register in authentication.service.ts');
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    console.log('login in authentication.service.ts');
    return this.request('post', 'login', user);
  }

  public home(): Observable<any> {
    console.log('home in authentication.service.ts');
    return this.request('get', 'home');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
