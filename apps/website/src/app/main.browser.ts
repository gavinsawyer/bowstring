/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { WebsiteBrowserModule }   from "./modules";


(async (bootstrap: () => Promise<void>): Promise<void> => document.readyState === "complete" ? bootstrap() : document.addEventListener<"DOMContentLoaded">(
  "DOMContentLoaded",
  bootstrap,
  {
    once: true,
  },
))(
  (): Promise<void> => platformBrowserDynamic().bootstrapModule<WebsiteBrowserModule>(WebsiteBrowserModule).then<void, void>(
    (): void => void (0),
    (error: unknown): void => console.error(error),
  ),
);
