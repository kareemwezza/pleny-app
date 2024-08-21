import { Component, Input } from '@angular/core';
import { IProduct } from '@models';
import { ProductService } from '@services';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  constructor(private productService: ProductService) {
  }

  get originalPrice() {
    if (this.product.discountPercentage < 0 || this.product.discountPercentage >= 100) {
      throw new Error("Discount percentage must be between 0 and 100.");
    }
    return (this.product.price / (1 - (this.product.discountPercentage / 100))).toFixed(2);
  }

  get productRating() {
    return `${((this.product.rating / 5) * 100).toFixed(0)}%`;
  }

  addToCart() {
    this.productService.addProductToCart(this.product.id)?.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error)
    })
  }

}
