import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { User } from '../../../models/user.model';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories :Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.categoriesService.getAll().subscribe(categories => {
      this.categories = categories;
    });
    
    this.authService.user$.subscribe(user => {
      this.profile = user;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(user => {
      this.profile = user;
    });
  }

  logout() {
   this.authService.logout();
   this.profile = null;
   this.router.navigate(['/home'])
  }

}
