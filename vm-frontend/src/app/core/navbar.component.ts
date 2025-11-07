import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-left">
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/vms" routerLinkActive="active">Máquinas Virtuais</a>
        <a routerLink="/vms/create" routerLinkActive="active">Nova VM</a>
      </div>
      <button (click)="logout()">Sair</button>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1976d2;
      color: #fff;
      padding: 10px 20px;
    }
    .navbar a {
      color: #fff;
      margin-right: 16px;
      text-decoration: none;
      font-weight: 500;
    }
    .navbar a.active {
      text-decoration: underline;
    }
    button {
      background: #e74c3c;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
    }
  `]
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
