import { Component, OnInit } from '@angular/core';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-sitios-de-interes',
  templateUrl: './sitios-de-interes.page.html',
  styleUrls: ['./sitios-de-interes.page.scss'],
})
export class SitiosDeInteresPage implements OnInit {

  map=null;
  infowindow: any;
  marcadores:[]
  markers: Marker[] = [
    {
      position: {
        lat: -34.635019789887885, 
        lng: -58.398535252682805,
      },
      title: 'Herreria artistica y trabajos en general'
    },
    {
      position: {
        lat: -  34.64298301735791, 
        lng: -58.403174620464426,
      },
      title: 'Plomero y Gasista, Aredes Jose'
    },
    {
      position: {
        lat: -34.616755919713064, 
        lng: -58.425090641253405,
      },
      title: 'Carpinteria el umbral'
    },
    {
      position: {
        lat: -34.64236620952456, 
        lng: -58.41994464633492,
      },
      title: 'MV Electricista'
    },  
  ];


  constructor() { }

  ngOnInit() {  
    this.loadMap();
  }
  loadMap() {
    // crea un nuevo mapa desde HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // crea un objeto con latitud y longitud
    const myLatLng = {lat: -34.6393847, lng: -58.4028649};
    // crea el mapa
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12,
      mapId:"1f52087ef0526978",
    });
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
    //  this.renderMarkers();
      mapEle.classList.add('show-map');
      this.renderMarkers();
      
      // const marker=new google.maps.Marker({
      //    position:{
      //       lat: -34.6393847,
      //       lng: -58.4028649
      //    },
      //    title:'punto uno'
      // })
      //  this.addMarker(marker);
     
      //  infowindow= new google.maps.Infowindow()
      //  let html= `<h3>punto1</3>`

      //  google.maps.event.addListener (marker,"click", ()=>{
      //  infowindow.setContent(html);
      //  infowindow.open(this.map,marker)
       
      // })
      this.displayFerreteriasList() ;
      
       
       
    });



  }
  //renderiza las marcas
  displayFerreteriasList=()=>{
    let HTMLElement=""
    this.markers.forEach(marker=>{
      HTMLElement += `<h6>${marker.title}</h6>`  

    })
    document.getElementById("ferreterias_nombres").innerHTML=HTMLElement;
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
      console.log(this.marcadores)
    
    });
  }
  //agrega marcas
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon:"./assets/construction.png"
    });
    }

  setInfoWindow(markers: Marker, position: string, title: string) {

    const contentString  =  '<div id="contentInsideMap">' +
                            '<div>' +
                            '</div>' +
                            '<p style="font-weight: bold; margin-bottom: 5px;">' + title + '</p>' +
                            '<div id="bodyContent">' +
                            '<p class"normal m-0">'
                             '</p>' +
                            '</div>' +
                            '</div>';
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, markers);

}

}
