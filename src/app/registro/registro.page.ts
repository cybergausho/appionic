import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

 

  constructor(private authSvc:AuthService,private router:Router) { 
    
  }
    
  ngOnInit() {
  }
    async registrarse(email,password){
      try{
        const user=await this.authSvc.register(email.value,password.value);
        if(user){
          //console.log('User->',user);
          const estaVerficado= this.authSvc.siEmailVerificado(user);
          this.redireccionarUsuario(estaVerficado);
        }
      }
      catch(error){
          console.log('Error',error);
      }
    }
    private redireccionarUsuario(estaVerificado:boolean):void{
      if(estaVerificado){
        this.router.navigate(['home']);//se redirecciona a la pagina home
      }
      else{
        this.router.navigate(['verificacion-email']); // se direciona a la pagina verfificacionde email
      }
    
    }
  }
  

