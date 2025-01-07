import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

function loadGoogleMapsApi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('google-maps-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = (error) => reject(error);

    document.head.appendChild(script);
  });
}


loadGoogleMapsApi()
  .then(() => {
    bootstrapApplication(AppComponent, appConfig).catch((err) =>
      console.error('Error al inicializar la aplicación:', err)
    );
  })
  .catch((err) => {
    console.error('Error al cargar Google Maps API:', err);
  });
