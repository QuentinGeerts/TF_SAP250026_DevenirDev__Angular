import { Component, inject, OnInit } from '@angular/core';
import { Exo08List } from "./exo08-list/exo08-list";
import { Exo08Add } from "./exo08-add/exo08-add";
import { Product } from '../../../shared/models/product.model';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-exo08',
  imports: [Exo08List, Exo08Add],
  templateUrl: './exo08.html',
  styleUrl: './exo08.css',
})
export class Exo08 implements OnInit {
  
  private readonly _productsService: ProductsService = inject(ProductsService);
  products: Product[] = [];
  
  ngOnInit(): void {
    this.products = this._productsService.getProducts();
  }

  addToProducts(newProduct: Product) {
    this._productsService.addProduct(newProduct);
    this.products = this._productsService.getProducts();
  }
  
  removeToProducts(index: number) {
    // Suppression de l'élément dans la liste
    this._productsService.removeProduct(index);
    // Mise à jour de la vue
    this.products = this._productsService.getProducts();
  }
}
