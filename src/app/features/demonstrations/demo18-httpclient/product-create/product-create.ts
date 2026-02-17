import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../../shared/models/product.model';
import { ProductHttpclientService } from '../../../../core/services/product-httpclient.service';

@Component({
  selector: 'app-product-create',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _productsService: ProductHttpclientService = inject(ProductHttpclientService);
  private readonly _router: Router = inject(Router);

  productForm: FormGroup = this._fb.group({
    name: [null, [Validators.required, Validators.maxLength(50)]],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (this.productForm.invalid) return;

    const newProduct: Product = this.productForm.value;

    this._productsService.createProduct(newProduct).subscribe({
      next: () => this._router.navigate(["demonstrations", "demo18"])
    });
  }

}
