import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('role', res.role);
          console.log(JSON.stringify(res)+"matwa")
          if (res.role === 'admin') {
            this.router.navigate(['/dashboard/admin']);
          } else if (res.role === 'client') {
            this.router.navigate(['/dashboard/client']);
          } else if (res.role === 'fournisseur') {
            this.router.navigate(['/dashboard/fournisseur']);
          }
        },
        error: () => {
          this.errorMessage = 'Identifiants invalides';
        }
      });
  }

}
