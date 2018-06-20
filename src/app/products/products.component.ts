import { Component, OnInit } from '@angular/core';

import { Product } from '../product';

import { ProductService } from '../product.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {

  products: Product[];

  selectedProduct: Product;

  constructor(private productService: ProductService) { }

  onSelectProduct(product) {
    this.selectedProduct = product;

    this.productService.getProduct(product.id)
      .subscribe(product => console.log(product))
  }

  ngOnInit() {
    this.getProducts();
    // this.selectedProduct = this.products[0];
  }

  getProducts(): void {
    const products = this.productService.getProducts()
      .subscribe(products => this.products = products)
  }

  save(product): void {
    this.productService.updateProduct(product)
      .subscribe(() => console.log('Product Saved!'));
  }

  add(title: string, projectName: string, memberName: string,
     createDate: string, startDate: string, endDate: string): void {
    this.productService.addProduct({ title, projectName, memberName,
      createDate, startDate, endDate } as Product)
      .subscribe(product => {
        this.products.push(product);
      });
  }

  delete(productId: number): void {
    this.products = this.products.filter(product => product.id !== productId);

    this.productService.deleteProduct(productId)
      .subscribe();
  }
}
