import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe} from '@angular/common';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit{
  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];


  // THIS INPUT LISTEN IF THE PRODUCT ID CHANGE 
  @Input()
  set ProductId(Id: string | null){
    if(Id){
      this.onShowDetail(Id)
    }
  }

  @Output() LoadMore: EventEmitter<string> = new EventEmitter<string>();
  showProductDetail = false;
  productChosen: Product | null = null;
  limit = 10;
  offset = 0;
  activedUrl :string ="";
  categoryId :string | null= null;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  // VER LA RUTA DE LA PAGINA PARA SABER LA PAGINACION 

  ngOnInit(): void {
    
    this.route.url.subscribe(urlSegments => {
      const currentUrl = urlSegments.join('/');
      this.activedUrl = urlSegments[0].path

      
    });

  //   this.route.paramMap.subscribe(params => {
  //     this.categoryId = params.get('id');
  //     if(this.categoryId ){
  //      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
  //      .subscribe(products => {
  //        console.log(products);

  //      })

  //     }
  //     this.offset += this.limit;
  //     console.log(this.categoryId);

  //  })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }

    this.productsService.getOne(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo prodcuto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    if (this.productChosen) {
      const changes: UpdateProductDTO = {
        title: 'change title',
      };
      const id = this.productChosen?.id;
      this.productsService.update(id, changes).subscribe((data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products[productIndex] = data;
        this.productChosen = data;
      });
    }
  }

  deleteProduct() {
    if (this.productChosen) {
      const id = this.productChosen?.id;
      this.productsService.delete(id).subscribe(() => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
    }
  }

  loadMore() {
    this.LoadMore.emit();
  }

  rigth() {
    if(this.activedUrl == "home"){
      this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
        this.products = data;
      });
    }else if (this.activedUrl == "category"  ){
      if(this.categoryId){
        this.productsService.getByCategory( this.categoryId, this.limit, this.offset).subscribe((data) => {
          this.products = data;
        });
      
      }
      }
    

    this.offset += 10;

  }

  left() {
    if (this.offset != 10) {
      if(this.activedUrl == "home"){
        this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
          this.products = data;
        });
      }else if (this.activedUrl == "category"  ){
        if(this.categoryId){
          this.productsService.getByCategory( this.categoryId, this.limit, this.offset).subscribe((data) => {
            this.products = data;
          });
        
        }
        }
    }
  }
}
