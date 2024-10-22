/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { WebsiteBrowserModule }   from "./modules";


function bootstrap(): Promise<void> {
  return platformBrowserDynamic().bootstrapModule<WebsiteBrowserModule>(WebsiteBrowserModule).then<void, never>(
    (): void => void (0),
    (error: unknown): never => {
      console.error(error);

      throw error;
    },
  )
}

if (document.readyState === "complete")
  bootstrap().then<void>(
    (): void => void (0),
  );
else
  document.addEventListener<"DOMContentLoaded">(
    "DOMContentLoaded",
    bootstrap,
    {
      once: true,
    },
  );
