import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, NgChartsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {
 activeTab: 'produits' | 'stats' = 'produits';

  products = [
    { id: 1, name: 'Produit A', price: 100, stock: 20 },
    { id: 2, name: 'Produit B', price: 200, stock: 15 }
  ];
  displayedColumns: string[] = ['id', 'name', 'price', 'stock'];

  chartData = {
    labels: ['Janvier', 'Février', 'Mars'],
    datasets: [
      { label: 'Commandes', data: [10, 20, 30], backgroundColor: '#6366F1' }
    ]
  };

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
