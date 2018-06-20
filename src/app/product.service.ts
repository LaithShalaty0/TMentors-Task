import { Injectable } from '@angular/core';
import { Product } from './product'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private productsUrl = 'api/products';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, `operation: ${operation}`);

      return of(result as T);
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(products => console.log('Fetched Products!')),
      catchError(this.handleError('getProducts', []))
    );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.get<Product>(url).pipe(
      tap(product => console.log(`Fetched product of id ${id}!`, product)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, httpOptions).pipe(
      tap(_ => console.log(`Updated Product Of id ${product.id}!`)),
      catchError(this.handleError<any>('updateProduct'))
    )
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
        tap((product: Product) => console.log(`Added Product With ID ${product.id}`)),
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  deleteProduct(productId: number): Observable<Product> {
      const url = `${this.productsUrl}/${productId}!`;

      return this.http.delete<Product>(url, httpOptions).pipe(
        tap(_ => console.log(`Deleted product of id ${productId}!`)),
        catchError(this.handleError<Product>('deleteProduct'))
      );
  }

  
}
