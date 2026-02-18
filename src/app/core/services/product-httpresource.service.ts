import { HttpClient, HttpParams, HttpResourceRef, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO, Product, PaginationParams, PaginatedResponse } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpresourceService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly base_url = "http://localhost:3000/products";

  // Pour la récupération de valeur uniquement (travaille avec les signaux) → HttpResource
  getAllProducts(): HttpResourceRef<ProductDTO[]> {
    return httpResource<ProductDTO[]>(() => this.base_url, { defaultValue: [] });
  }

  getProductsWithParams(params: () => PaginationParams) {
    // Une Factory Function est une fonction qui crée et retourne un objet  sans utiliser new ni une classe
    // La méthode est appelée quand on en a besoin (ligne 23 donc permet d'exécuté dynamiquement le code)
    return httpResource<PaginatedResponse<ProductDTO>>(() => {
      const p = params();
      const query = new HttpParams({
        fromObject: {
          _page: String(p._page),
          _per_page: String(p._per_page),
          ...(p._sort && { _sort: p._sort }),
        }
      });
      console.log('query :>> ', query);
      return { url: this.base_url, params: query };
    });
  }

  getProductById(id: string): HttpResourceRef<ProductDTO | null> {
    return httpResource<ProductDTO | null>(() => `${this.base_url}/${id}`, { defaultValue: null });
  }

  // Pour les mutations (POST, PUT, DELETE) → HttpClient directement
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(this.base_url + "/" + id);
  }

  createProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.base_url, product);
  }

  updateProduct(id: string, product: Partial<Product>) {
    return this.http.patch<void>(this.base_url + "/" + id, product);
  }

}
