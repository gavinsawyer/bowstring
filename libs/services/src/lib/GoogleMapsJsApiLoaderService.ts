import { isPlatformBrowser }               from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Loader }                          from "@googlemaps/js-api-loader";
import { ENVIRONMENT }                     from "@standard/injection-tokens";
import { type Environment }                from "@standard/interfaces";


@Injectable(
  {
    providedIn: "root",
  },
)
export class GoogleMapsJsApiLoaderService {

  private readonly environment: Environment         = inject<Environment>(ENVIRONMENT);
  private readonly loader: Loader                   = new Loader(
    {
      apiKey:  this.environment.firebase.apiKey,
      version: "weekly",
    },
  );
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  private loaded: boolean = false as const;

  public load(): void {
    if (isPlatformBrowser(this.platformId) && !this.loaded)
      this.loader.importLibrary("maps").then<void>(
        (): void => {
          this.loaded = true;
        },
      );
  }

}
