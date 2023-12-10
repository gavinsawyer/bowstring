import { DOCUMENT, isPlatformBrowser }    from "@angular/common";
import { Component, inject, PLATFORM_ID } from "@angular/core";
import { ResponsivityService }            from "@standard/services";


@Component({
  selector:    "standard-website--root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
})
export class RootComponent {

  private readonly document:   Document = inject<Document>(DOCUMENT);
  private readonly platformId: object   = inject<object>(PLATFORM_ID);

  public readonly alert:               () => void          = (): void => isPlatformBrowser(this.platformId) ? this
    .document
    .defaultView
    ?.alert("Button click") : void (0);
  public readonly responsivityService: ResponsivityService = inject<ResponsivityService>(ResponsivityService);

}
