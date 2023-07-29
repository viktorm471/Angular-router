import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


// EXPORTAR GUARDIAN PARA EJECUTAR LA LOGICA EN LA SALIDA DE UN COMPONENTE en este caso registro

export interface onExit{
  onExit: () => boolean;
  // Observable<boolean> Promise<boolean>
}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: onExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.onExit ? component.onExit() : true;
  }
  
}
