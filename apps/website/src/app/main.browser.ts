/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { WebsiteBrowserModule }   from "./modules";


((bootstrap: () => Promise<void>): void => {
  if (document.readyState === "complete")
    bootstrap().then(
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
})(
  (): Promise<void> => platformBrowserDynamic().bootstrapModule<WebsiteBrowserModule>(WebsiteBrowserModule).then<void, never>(
    (): void => void (0),
    (error: unknown): never => {
      console.error(error);

      throw error;
    },
  ),
);
