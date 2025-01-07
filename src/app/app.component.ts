import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatInputModule } from '@angular/material/input';
import { SocketService } from '../app/services/socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  imports: [GoogleMapsModule, MatInputModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
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
  markers: { lat: number; lng: number }[] = [];

  constructor(private socketService: SocketService, private http: HttpClient) {}

  ngOnInit() {
    this.socketService.onNewLocation((location) => {
      console.log('Nueva ubicación recibida:', location);
      this.addMarker(location); // Función para agregar un marcador al mapa
    });
  }

  sendAddress() {
    if (!this.address) return;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.address)}&key=${environment.googleMapsApiKey}`;
    this.http.get<any>(url).subscribe((response) => {
      if (response.results.length) {
        const location = response.results[0].geometry.location;
        console.log('Enviando coordenadas:', location); // Verifica qué datos estás enviando
        this.socketService.sendCoordinates(location); // Enviar al servidor
        this.address = '';
      }
    });
  }

  // Ejemplo de función para agregar un marcador al mapa
  addMarker(coords: { lat: number; lng: number }): void {
    console.log('Añadiendo marcador al mapa:', coords);
    // Aquí puedes añadir la lógica para actualizar el mapa con el marcador
  }
}
