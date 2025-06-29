import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

   provideHttpClient(),
   provideAnimations(),
   importProvidersFrom(ToastrModule.forRoot(
    {
       positionClass: 'toast-top-right',
    preventDuplicates: true,
    timeOut: 3000,
    }
   ))
  ],
};
