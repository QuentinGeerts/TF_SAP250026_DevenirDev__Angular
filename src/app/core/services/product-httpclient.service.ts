import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductDTO } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpclientService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly base_url = "http://localhost:3000/products";

  getAllProducts(): Observable<ProductDTO[]> {
    return this._httpClient.get<ProductDTO[]>(this.base_url);
  }

  getProductById(id: string): Observable<ProductDTO> {
    return this._httpClient.get<ProductDTO>(this.base_url + "/" + id);
  }

  deleteProduct(id: string): Observable<void> {
    return this._httpClient.delete<void>(this.base_url + "/" + id);
  }

  createProduct(product: Product): Observable<void> {
    return this._httpClient.post<void>(this.base_url, product);
  }
  
}
