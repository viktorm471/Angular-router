import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

constructor(    private productsService: ProductsService,
   private route: ActivatedRoute,
  ){

}

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe((params) => {
      this.productId = params.get('product');
    });

    this.productsService.getAll(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
  }

  loadMore() {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
