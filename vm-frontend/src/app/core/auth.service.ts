import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'auth_token';

  login(email: string, password: string): boolean {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk || !password) return false;
    localStorage.setItem(this.key, 'ok');
    return true;
  }
  logout() { localStorage.removeItem(this.key); }
  isLoggedIn(): boolean { return !!localStorage.getItem(this.key); }
}
