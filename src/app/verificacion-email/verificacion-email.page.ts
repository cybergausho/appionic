import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-verificacion-email',
  templateUrl: './verificacion-email.page.html',
  styleUrls: ['./verificacion-email.page.scss'],
})
export class VerificacionEmailPage  {
   user$:Observable<User>=this.authSvc.afAuth.user;//en caso de eque este logueado recuperamos usuario
  constructor(private authSvc:AuthService) { }

  
 async onReenviarEmail():Promise<void>{
    try{
      await this.authSvc.sendEmailVerificationEmail();
    }
    catch(error){
      console.log('Error->',error);
    }
  }
  ngOnDestroy():void{
    this.authSvc.logout();
  }
}
