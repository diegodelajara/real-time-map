import { Injectable } from '@angular/core';
import io from 'socket.io-client';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {

    this.socket = io('https://stage.allrideapp.com/tech_interview', {
      query: { room: 'diegodelajara' }, // Reemplaza con tu nombre de usuario de GitHub
      transports: ['websocket'], // Asegura que use WebSocket directamente
    });

    // Manejo de errores
    this.socket.on('connect_error', (err: any) => {
      console.error('Error de conexión con el servidor Socket.IO:', err);
    });

    // Confirmar conexión exitosa
    this.socket.on('connect', () => {
      console.log('Conectado al servidor Socket.IO');
    });
  }

  // Enviar coordenadas al servidor
  sendCoordinates(location: { lat: number; lng: number }) {
    this.socket.emit('newLocation', location);
  }

  // Suscribirse a nuevas ubicaciones
  onNewLocation(callback: (location: { lat: number; lng: number }) => void) {
    this.socket.on('newLocation', callback);
  }
}
