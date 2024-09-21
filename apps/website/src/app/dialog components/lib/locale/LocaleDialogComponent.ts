import { isPlatformBrowser, Location }                                                                 from "@angular/common";
import { Component, inject, LOCALE_ID }                                                                from "@angular/core";
import { ButtonComponent, CardComponent, DialogComponent, FlexboxContainerComponent, HeaderComponent } from "@standard/components";
import { LOCALE_IDS }                                                                                  from "../../../injection tokens";
import { type LocaleId }                                                                               from "../../../types";


@Component(
  {
    host:        {
      "[class.extends-standard--dialog]": "true",
    },
    selector:    "standard-website-dialogs--locale",
    standalone:  true,
    styleUrls:   [
      "LocaleDialogComponent.sass",
    ],
    templateUrl: "LocaleDialogComponent.html",
    imports:     [
      ButtonComponent,
      CardComponent,
      FlexboxContainerComponent,
      HeaderComponent,
    ],
  },
)
export class LocaleDialogComponent
  extends DialogComponent {

  private readonly location: Location = inject<Location>(Location);

  protected readonly localeId: LocaleId                    = inject<LocaleId>(LOCALE_ID);
  protected readonly localeDisplayNames: Intl.DisplayNames = new Intl.DisplayNames(
    [
      this.localeId,
    ],
    {
      type: "language",
    },
  );
  protected readonly localeIds: LocaleId[]                 = inject<LocaleId[]>(LOCALE_IDS);

  public changeLocale(localeId: LocaleId): void {
    return isPlatformBrowser(
      this.platformId,
    ) ? ((): void => {
      this.document.location.href = `/${ localeId + this.location.path() }`;
    })() : void (0);
  }

}
