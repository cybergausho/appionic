import { Component, Input, OnInit } from '@angular/core';
import {Publicacion} from '../../models'

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent implements OnInit {
  @Input() publicacion: Publicacion;
  constructor() { }

  ngOnInit() {}

  contactar(num:number){
    
    let url="https://api.whatsapp.com/send?phone="+num;
    window.open(url);
  }

}
