/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/* The code `platformBrowserDynamic().bootstrapModule(AppModule)` is responsible for bootstrapping the Angular application. It initializes the application module (`AppModule`) and starts the application by loading the root component and its dependencies. */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
