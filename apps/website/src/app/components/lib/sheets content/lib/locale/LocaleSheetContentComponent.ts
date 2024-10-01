import { DOCUMENT, isPlatformBrowser, Location, NgTemplateOutlet }                      from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID }                                    from "@angular/core";
import { ButtonComponent, FlexboxContainerComponent, HeaderComponent, SymbolComponent } from "@standard/components";
import { LOCALE_IDS }                                                                   from "../../../../../injection tokens";
import { type LocaleId }                                                                from "../../../../../types";


@Component(
  {
    imports:     [
      ButtonComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      NgTemplateOutlet,
      SymbolComponent,
    ],
    selector:    "standard-website--sheet-contents--locale",
    standalone:  true,
    styleUrls:   [
      "LocaleSheetContentComponent.sass",
    ],
    templateUrl: "LocaleSheetContentComponent.html",
  },
)
export class LocaleSheetContentComponent {

  private readonly document: Document               = inject<Document>(DOCUMENT);
  private readonly location: Location               = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

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
