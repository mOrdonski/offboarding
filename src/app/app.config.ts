import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { routes } from './app.routes';
import { APP_STORE_PROVIDERS } from './app.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideEnvironmentNgxMask(),
    provideRouter(routes),
    provideStore(),
    ...APP_STORE_PROVIDERS,
    provideEffects(),
    provideRouterStore(),
    provideHttpClient(),
  ],
};
