import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {
  constructor (public navControl: NavController){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // if(localStorage.getItem('Ingresado')){
        // return false;
        //  }
        //  else{
        //   this.navControl.navigateRoot('menu/inicio');
        return true;
      }
  
}
