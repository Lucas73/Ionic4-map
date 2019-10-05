import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 @ViewChild('map', { static: false }) mapElement: ElementRef;

  map: any;
    mapOptions: any;
    location = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    apiKey: any = '';//<---- Quito mi Api Key para no subirla a Git Hub

  constructor(public geolocation: Geolocation) {

     const script = document.createElement('script');
     script.id = 'googleMap';
     if (this.apiKey) {
         script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
     } else {
         script.src = 'https://maps.googleapis.com/maps/api/js?key=';
     }
     document.head.appendChild(script)

    this.geolocation.watchPosition().subscribe((data) => {
      console.log("lat" + data.coords.latitude + "- long" + data.coords.longitude)
      this.location.lat =  data.coords.latitude;
      this.location.lng = data.coords.longitude;
    });

     this.mapOptions = {
      center: this.location,
      zoom: 21,
      mapTypeControl: false
    };

    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      this.markerOptions.position = this.location;
      this.markerOptions.map = this.map;
      this.markerOptions.title = 'My Location';
      this.marker = new google.maps.Marker(this.markerOptions);
    }, 3000);
  }
  
  

}
