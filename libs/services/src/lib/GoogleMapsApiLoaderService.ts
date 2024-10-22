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
export class GoogleMapsApiLoaderService {

  private readonly environment: Environment         = inject<Environment>(ENVIRONMENT);
  private readonly loader: Loader                   = new Loader(
    {
      apiKey:  this.environment.firebase.apiKey,
      version: "weekly",
    },
  );
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  private mapsLibrary?: google.maps.MapsLibrary;

  public async load(): Promise<google.maps.MapsLibrary | null> {
    return isPlatformBrowser(this.platformId) && !this.mapsLibrary ? this.loader.importLibrary("maps").then<google.maps.MapsLibrary>(
      (mapsLibrary: google.maps.MapsLibrary): google.maps.MapsLibrary => {
        this.mapsLibrary = mapsLibrary;

        return mapsLibrary;
      },
    ) : this.mapsLibrary || null;
  }

}
