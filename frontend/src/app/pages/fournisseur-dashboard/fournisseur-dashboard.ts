import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fournisseur-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './fournisseur-dashboard.html',
  styleUrls: ['./fournisseur-dashboard.css']
})
export class FournisseurDashboardComponent {
  activeTab: 'produits' | 'commandes' = 'produits';

  products = [
    { id: 1, name: 'Produit X', price: 150, stock: 10 },
    { id: 2, name: 'Produit Y', price: 250, stock: 5 }
  ];
  displayedColumnsProducts: string[] = ['id', 'name', 'price', 'stock'];

  orders = [
    { id: 1, product: { name: 'Produit X' }, quantity: 3, status: 'Expédié' },
    { id: 2, product: { name: 'Produit Y' }, quantity: 1, status: 'En attente' }
  ];
  displayedColumnsOrders: string[] = ['id', 'product', 'quantity', 'status'];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
