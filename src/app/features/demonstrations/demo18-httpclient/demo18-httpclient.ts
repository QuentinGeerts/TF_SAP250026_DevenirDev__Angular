import { Component, inject, OnInit } from '@angular/core';
import { ProductDTO } from '../../../shared/models/product.model';
import { ProductHttpclientService } from '../../../core/services/product-httpclient.service';
import { mergeMap, of } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-demo18-httpclient',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './demo18-httpclient.html',
  styleUrl: './demo18-httpclient.css',
})
export class Demo18Httpclient implements OnInit {

  private readonly _productsService = inject(ProductHttpclientService);
  private readonly _router: Router = inject(Router);
  products$ = of<ProductDTO[]>([]);

  ngOnInit(): void {
    // this._productsService.getAllProducts().subscribe({
    //   next: (value: ProductDTO[]) => {
    //     console.log('value :>> ', value);
    //     this.products = value
    //   }
    // });

    this.products$ = this._productsService.getAllProducts();
  }

  details(id: string) {
    this._router.navigate(["demonstrations", "demo18", id, "details"])
  }

  deleteProduct(id: string) {
    if (!confirm("Voulez-vous supprimer le produit ?")) return;

    this.products$ = this._productsService.deleteProduct(id)
      .pipe(
        mergeMap(() => this._productsService.getAllProducts())
      );
  }

  createProduct() {
    this._router.navigate(["demonstrations", "demo18", "create"])
  }
}
