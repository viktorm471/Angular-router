import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { AdminGuard } from './guards/admin.guard';


// PRELOAD ALL MODULES 
// ALLOW YOU PRELOAD THE OTHER CHUNKS WHEN THE INITIAL RENDER IS ALREADY LOADED
// IF YOU DONT HAVE MUCH MODULES if not implements a customice service of loading 

// TODAS LAS VISTAS ANIDADAS VAN A TENER LA MISMA ESTRUCTURA DEL PADRE 
// DE ESA FORMA SE PUEDEN HACER VISTAS SIN EL NAVBAR
// ng g m cms --routing TO GENERATE OTHER MODULE WITH ROUTEING 

// THIS IS LAZY LOADING ONLY WHEN I GET THE ROUTE THE APP HAVE TO CHARGE THE MODULE
//   {path: 'cms', loadChildren: (()=> import('./cms/cms.module').then( m=> m.CmsModule))},


const routes: Routes = [
  
 
  {path: '', loadChildren: (()=> import('./website/website.module').then( m=> m.WebsiteModule)),
  data:{
    preload: true
  }},
  {path: 'cms', canActivate:[AdminGuard], loadChildren: (()=> import('./cms/cms.module').then( m=> m.CmsModule))},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: CustomPreloadService
  } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
