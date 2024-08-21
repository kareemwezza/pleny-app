import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';

import { AuthService } from '@services';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (auth: AuthService, router: Router) => {
        return async () => {
          try {
            await auth.initializeAuthUser();
          } catch (e) {
            console.log(e);
            router.navigate(['/auth/login']);
          }
        };
      },
      deps: [AuthService, Router]
    }
  ]
};
