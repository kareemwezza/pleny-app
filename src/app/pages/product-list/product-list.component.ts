import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ProductCardComponent } from '@components/product-card/product-card.component';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { ICategory, IProduct } from '@models';
import { ProductService } from '@services';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    AsyncPipe,
    NgForOf,
    PaginatorComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  title = 'Products';
  selectedCategory: ICategory | undefined;
  categories$!: Observable<ICategory[]>;
  products$!: Observable<IProduct[]>;
  totalLength: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.categories$ = this.productService.listCategories();
    this.route.queryParamMap.subscribe(paramMap => {
      const _searchParam = paramMap.get('search');
      if (_searchParam) {
        this.products$ = this.productService.searchProducts(_searchParam)
          .pipe(map(list => {
            this.totalLength = list.total;
            return list.products
          }));
      } else {
        this.products$ = this.productService.listProducts()
          .pipe(map(list => {
            this.totalLength = list.total;
            return list.products;
          }));
      }
    });
  }

  handleCategoryChange(category?: ICategory) {
    if (category) {
      this.title = category.name;
      this.selectedCategory = category;
      this.products$ = this.productService.listCategoryProducts(category.slug)
        .pipe(map(list => {
          this.totalLength = list.total;
          return list.products;
        }));
    } else {
      this.title = 'Products';
      this.selectedCategory = undefined;
      this.products$ = this.productService.listProducts()
        .pipe(map(list => {
          this.totalLength = list.total;
          return list.products;
        }));
    }
  }

  handlePageChange(page: number) {
    if (this.selectedCategory) {
      this.products$ = this.productService.listCategoryProducts(this.selectedCategory.slug, page)
        .pipe(map(list => {
          this.totalLength = list.total;
          return list.products;
        }));
    } else {
      this.products$ = this.productService.listProducts(page)
        .pipe(map(list => {
          this.totalLength = list.total;
          return list.products;
        }));
    }

  }
}
