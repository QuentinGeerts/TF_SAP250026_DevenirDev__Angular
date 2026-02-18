export interface Product {
  name: string;
  price: number;
}

export interface ProductDTO extends Product {
  id: string;
}

export interface PaginatedResponse<T> {
  first: number;      
  prev: number | null;
  next: number | null;
  last: number;       
  pages: number;      
  items: number;      
  data: T[];          
}

export interface PaginationParams {
  _page: number;
  _per_page: number;
  _sort?: keyof Product | `-${keyof Product}`;
}