import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        return   this.authService.user$.pipe(
      map(user =>{
        console.log(user)
        if(user?.role == 'admin'){
          return true 
        }else{
          this.router.navigateByUrl("/home")
          return  false;
    
        }
      }))
    }
}
