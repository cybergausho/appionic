import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { canActivate } from '@angular/fire/auth-guard';
import { AuthGuard } from './shared/auth.guard';
import { AlreadyregisteredGuard } from './shared/alreadyregistered.guard';
import { SetPublicacionesComponent } from './backend/set-publicaciones/set-publicaciones.component';
const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'set-publicaciones',component: SetPublicacionesComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
     canActivate:[AlreadyregisteredGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
    canActivate:[AlreadyregisteredGuard]
  },
   {
     path: 'inicio',
     loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate:[AuthGuard]
   },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    canActivate:[IngresadoGuard]
  },
  {
    path: 'verificacion-email',
    loadChildren: () => import('./verificacion-email/verificacion-email.module').then( m => m.VerificacionEmailPageModule)
  },
  {
    path: 'olvidar-contrasenia',
    loadChildren: () => import('./olvidar-contrasenia/olvidar-contrasenia.module').then( m => m.OlvidarContraseniaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sitios-de-interes',
    loadChildren: () => import('./sitios-de-interes/sitios-de-interes.module').then( m => m.SitiosDeInteresPageModule)
  },
 
  // {
  //   path: 'entradas',
  //   loadChildren: () => import('./entradas/entradas.module').then( m => m.EntradasPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
