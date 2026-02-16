import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly products: Product[] = [
    { name: 'Pomme', price: 1.2 },
    { name: 'Poire', price: 1.23 },
    { name: 'Cerise', price: 3.23 },
  ];

  getProducts(): Product[] {
    return [...this.products];
  }

  addProduct(product: Product): Product | null {
    if (product.name === "") return null;
    this.products.push(product);
    return product;
  }

  removeProduct(index: number): Product | null {
    if (index < 0 || index >= this.products.length) return null;
    return this.products.splice(index, 1)[0];
  }

}
