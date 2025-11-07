import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    const ok = this.auth.login(this.email, this.password);
    this.error = !ok;
    if (ok) {
      this.router.navigate(['/dashboard']);
    }
  }
}
