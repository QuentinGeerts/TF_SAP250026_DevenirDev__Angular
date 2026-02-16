import { Component, input, output } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-exo08-list',
  imports: [CurrencyPipe],
  templateUrl: './exo08-list.html',
  styleUrl: './exo08-list.css',
})
export class Exo08List {
  productsToDisplay = input<Product[]>([]);
  deletedProduct = output<number>();

  remove(index: number) {
    this.deletedProduct.emit(index);
  }
}
