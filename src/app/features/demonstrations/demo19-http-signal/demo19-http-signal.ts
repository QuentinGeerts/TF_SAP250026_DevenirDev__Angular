import { Component, computed, inject, signal } from '@angular/core';
import { ProductHttpresourceService } from '../../../core/services/product-httpresource.service';
import { CurrencyPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-demo19-http-signal',
  imports: [CurrencyPipe, JsonPipe],
  templateUrl: './demo19-http-signal.html',
  styleUrl: './demo19-http-signal.css',
})
export class Demo19HttpSignal {

  page = signal(1);
  perPage = signal(15);
  

  private readonly productService: ProductHttpresourceService = inject(ProductHttpresourceService);

  private readonly paginationParams = signal({ _page: this.page(), _per_page: this.perPage() });

  // Sans délai
  response = this.productService.getProductsWithParams(() => this.paginationParams());
  products = computed(() => this.response.value()?.data ?? [])

  deleteProduct(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer ?")) return;
    // Méthode retournant un observable => subscribe
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.response.reload(); // Mise à jour propre de la vue (grâce à HttpResource et signal)
      },
      error: err => {
        console.log("Erreur lors de la suppression. Détails:", err);
      }
    });
  }

  updateProduct(index: string) {

  }

  detailsProduct(index: string) {

  }

  // Gestion de la pagination

  loadData(page: number) {
    // httpResource fonctionne comme computed : il enregistre les signaux lus à l'intérieur de sa factory. Quand paginationParams change, Angular sait qu'il doit rejouer la factory et relancer la requête HTTP automatiquement — sans aucun subscribe ni déclenchement manuel
    this.paginationParams.update(previous => ({ ...previous, _page: page }));
    this.page.set(page);
  }

  hasPrevious(): boolean {
    return this.response.value()?.prev !== null;
  }

  hasNext(): boolean {
    return this.response.value()?.next !== null;
  }

}
