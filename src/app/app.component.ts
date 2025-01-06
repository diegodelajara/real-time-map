import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [GoogleMapsModule, MatInputModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'real-time-map';
  address: string = '';
  center: google.maps.LatLngLiteral = { lat: -33.4489, lng: -70.6693 }; // Santiago, Chile
  zoom: number = 13;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  };
  markers: google.maps.LatLngLiteral[] = [];

  sendAddress() {
    // Implement geocoding and socket.io logic here
  }
}
