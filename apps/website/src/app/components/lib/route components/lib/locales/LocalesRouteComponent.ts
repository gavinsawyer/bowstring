import { DatePipe, DOCUMENT, isPlatformBrowser, NgForOf }                   from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID }                        from "@angular/core";
import { ButtonComponent, CapsuleComponent, CardComponent, RouteComponent } from "@standard/components";
import project                                                              from "../../../../../../../project.json";
import { LOCALES }                                                          from "../../../../../injection tokens";


@Component({
  imports: [
    ButtonComponent,
    CapsuleComponent,
    CardComponent,
    DatePipe,
    NgForOf,
  ],
  standalone:  true,
  styleUrls:   [
    "./LocalesRouteComponent.sass",
  ],
  templateUrl: "./LocalesRouteComponent.html",
})
export class LocalesRouteComponent extends RouteComponent {

  private readonly document:   Document = inject<Document>(DOCUMENT);
  private readonly platformId: string   = inject<string>(PLATFORM_ID);

  public readonly changeLocale: (locale: keyof typeof project.i18n.locales | "en-US") => void = (locale: keyof typeof project.i18n.locales | "en-US"): void => isPlatformBrowser(this.platformId) ? ((): void => {
    this
      .document
      .location
      .href = "/" + locale + "/locales";
  })() : void (0);
  public readonly localeId:     keyof typeof project.i18n.locales | "en-US"                   = inject<keyof typeof project.i18n.locales | "en-US">(LOCALE_ID);
  public readonly locales:      (keyof typeof project.i18n.locales | "en-US")[]               = inject<(keyof typeof project.i18n.locales | "en-US")[]>(LOCALES);

}
