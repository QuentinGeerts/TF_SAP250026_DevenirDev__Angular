export interface Product {
  name: string;
  price: number;
}

export interface ProductDTO extends Product {
  id: string;
}
