import { DOCUMENT, isPlatformBrowser, Location }     from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID } from "@angular/core";
import { BRAND, GIT_INFO, PACKAGE_VERSION }          from "@standard/injection-tokens";
import { ResponsivityService }                       from "@standard/services";
import { Brand }                                     from "@standard/types";
import { GitInfo }                                   from "git-describe";
import { LOCALE_IDS }                                from "../../../injection tokens";
import { LocaleId }                                  from "../../../types";


@Component(
  {
    selector:    "standard-website--root",
    styleUrls:   [
      "RootComponent.sass",
    ],
    templateUrl: "RootComponent.html",
  },
)
export class RootComponent {

  private readonly document: Document               = inject<Document>(DOCUMENT);
  private readonly location: Location               = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly brand: Brand                             = inject<Brand>(BRAND);
  protected readonly gitInfo: Partial<GitInfo>                = inject<Partial<GitInfo>>(GIT_INFO);
  protected readonly localeId: LocaleId                       = inject<LocaleId>(LOCALE_ID);
  protected readonly localeDisplayNames: Intl.DisplayNames    = new Intl.DisplayNames(
    [
      this.localeId,
    ],
    {
      type: "language",
    },
  );
  protected readonly localeIds: LocaleId[]                    = inject<LocaleId[]>(LOCALE_IDS);
  protected readonly packageVersion: string                   = inject<string>(PACKAGE_VERSION);
  protected readonly responsivityService: ResponsivityService = inject<ResponsivityService>(ResponsivityService);

  public changeLocale(localeId: LocaleId): void {
    return isPlatformBrowser(
      this.platformId,
    ) ? ((): void => {
      this.document.location.href = "/" + localeId + this.location.path();
    })() : void (0);
  }

}
