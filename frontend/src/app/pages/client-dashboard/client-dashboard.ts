import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './client-dashboard.html',
  styleUrls: ['./client-dashboard.css']
})
export class ClientDashboardComponent {
 activeTab: 'commandes' = 'commandes';

  myOrders = [
    { id: 1, product: { name: 'Produit A' }, quantity: 2, status: 'Livré' },
    { id: 2, product: { name: 'Produit B' }, quantity: 1, status: 'En cours' }
  ];
  displayedColumns: string[] = ['id', 'product', 'quantity', 'status'];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
