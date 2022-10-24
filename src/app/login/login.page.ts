import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin:FormGroup;

  constructor(
    private authSvc:AuthService,
    private router:Router,
    public fb:FormBuilder,
    public alertController:AlertController,
    public navControl: NavController
    ) { 
  this.formularioLogin=this.fb.group({
    'nombre': new FormControl("",Validators.required),
    'contraseña': new FormControl("",Validators.required),

  })
  }
ngOnInit() {
  }
async ingresar(email,password){
  try{
    const user= await this.authSvc.login(email.value,password.value);
  
  if (user){
      console.log('Usuario ingresado');
      const estaVerificado=this.authSvc.siEmailVerificado(user);
      this.redireccionarUsuario(estaVerificado);
      //console.log('verificacion->',estaVerificado);
    }
  else{
     const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Los datos ingresados no son correctos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
catch(error){
  console.log('Error',error);
}
}
async onLoginGoogle(){
  try{
    const user=await this.authSvc.loginGoogle();
    if(user){
      console.log('User->',user);
      //Todo: CheckEmail
      const estaVerificado=this.authSvc.siEmailVerificado(user);
      this.redireccionarUsuario(estaVerificado);
      //console.log('verificacion->',estaVerificado);
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
