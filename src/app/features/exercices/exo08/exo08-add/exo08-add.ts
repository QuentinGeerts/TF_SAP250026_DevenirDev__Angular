import { Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exo08-add',
  imports: [FormsModule],
  templateUrl: './exo08-add.html',
  styleUrl: './exo08-add.css',
})
export class Exo08Add {
  
  // EventEmitter
  createdProduct: OutputEmitterRef<Product> = output<Product>();

  // Propriétés pour le produit
  productName: WritableSignal<string> = signal("");
  productPrice = signal(0);

  createProduct() {
    const newProduct: Product = {
      name: this.productName(),
      price: this.productPrice()
    };

    this.productName.set("");
    this.productPrice.set(0);

    this.createdProduct.emit(newProduct);
  }
}
