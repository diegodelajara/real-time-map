import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';




export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    GoogleMapsModule,
    MatInputModule,
    GoogleMapsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    importProvidersFrom(
      AgmCoreModule.forRoot({
        apiKey: environment.googleMapsApiKey,
      }),
    ),
  ]

};
