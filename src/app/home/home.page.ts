import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public authService:AuthService,
    private router:Router
      
    
  ) { }

  ngOnInit() {
  }
onClick(){
  this.authService.logout()
  try{
    this.router.navigate(['/login']);
  }
   catch {}
   console.log('error') ;
}
}
