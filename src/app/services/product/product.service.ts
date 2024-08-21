import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory, IProduct, IProductList } from '@models';
import { env } from '@env/environment';
import { BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartProducts$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  listCategories() {
    return this.http.get<ICategory[]>(`${env.apiUrl}/products/categories`);
  }

  listCategoryProducts(category: string, page?: number) {
    const query = page ? '&skip=' + (page - 1) * 30 : '';
    return this.http.get<IProductList>(`${env.apiUrl}/products/category/${category}?limit=30${query}`);
  }

  listProducts(page?: number) {
    const query = page ? '&skip=' + (page - 1) * 30 : '';
    return this.http.get<IProductList>(`${env.apiUrl}/products?limit=30${query}`);
  }

  searchProducts(_query: string) {
    return this.http.get<IProductList>(`${env.apiUrl}/products/search?q=${_query}`);
  }

  getProduct(productId: number) {
    return this.http.get<IProduct>(`${env.apiUrl}/products/${productId}`);
  }

  addProductToCart(productId: number) {
    const userId = localStorage.getItem('userId');
    if (!userId) return of({});
    return this.http.post(`${env.apiUrl}/carts/add`, {
      merge: true,
      userId: JSON.parse(userId as string),
      products: [{
        id: productId,
        quantity: 1
      }]
    }).pipe(tap(data => {
      this.cartProducts$.next(this.cartProducts$.value + 1);
    }));
  }
}
