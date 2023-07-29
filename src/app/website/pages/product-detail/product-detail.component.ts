import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null=null;
  product: Product | null =null ;


  constructor(public route: ActivatedRoute, 
    private productsService : ProductsService,
    private location: Location
    ){


  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getOne(
              this.productId
            );
          }
          return [null];
        })
      )
      .subscribe((products) => {
        this.product = products;
      });

    
  }
  goToBack() {
    this.location.back();
    // this.router.navigate(['/category', id]);
}
}
