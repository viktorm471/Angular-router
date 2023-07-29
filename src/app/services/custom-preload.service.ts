import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { resourceUsage } from 'process';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// TO IMPLEMENT THIS SERVICE YOU NEED TO SPECIFY IN THE ROUTING IF YOU WANT TO LOAD THE MODULE
// IN APP ROUTING AND IN THE SPECIFIC MODULES 
export class CustomPreloadService implements PreloadingStrategy{

  constructor() { }
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if(route.data && route.data['preload']){
      return load()
    }
    return of(null)
  }
}
