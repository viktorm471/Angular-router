import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// HABILITAR DIRECTIVAS PARA TRABAJAR CON RUTAS 
import { RouterModule } from '@angular/router';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { HighlightDirective } from './directives/highlight.directive';


import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [ ReversePipe,
    TimeAgoPipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
   
  ],
  exports:[
    ReversePipe,
    TimeAgoPipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective
  ]
})
export class SharedModule { }
