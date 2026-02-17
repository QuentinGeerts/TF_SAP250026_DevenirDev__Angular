import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductHttpclientService } from '../../../../core/services/product-httpclient.service';
import { ProductDTO } from '../../../../shared/models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _productService: ProductHttpclientService = inject(ProductHttpclientService);

  product!: Signal<ProductDTO | undefined>;

  constructor() {
    const id = this._activatedRoute.snapshot.params["id"];
    this.product = toSignal(this._productService.getProductById(id));
  }
}
