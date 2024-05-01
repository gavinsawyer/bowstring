import { DOCUMENT, isPlatformBrowser, Location }                                                                          from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID, ViewChild }                                                           from "@angular/core";
import { ButtonComponent, DialogComponent as _DialogComponent, FlexboxComponent, HeaderComponent, HeadingGroupComponent } from "@standard/components";
import { LOCALE_IDS }                                                                                                     from "../../../injection tokens";
import { LocaleId }                                                                                                       from "../../../types";


@Component({
  exportAs:    "standardWebsiteLocaleDialog",
  imports: [
    _DialogComponent,
    ButtonComponent,
    FlexboxComponent,
    HeaderComponent,
    HeadingGroupComponent,
  ],
  selector:    "standard-website--locale-dialog",
  standalone:  true,
  styleUrls:   [
    "LocaleDialogComponent.sass",
  ],
  templateUrl: "LocaleDialogComponent.html",
})
export class LocaleDialogComponent {

  @ViewChild("dialogComponent", {
    read:   _DialogComponent,
    static: true,
  })
  public dialogComponent?: _DialogComponent;

  private readonly document:   Document             = inject<Document>(DOCUMENT);
  private readonly location:   Location             = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly changeLocale:       (localeId: LocaleId) => void = (localeId: LocaleId): void => isPlatformBrowser(
    this.platformId,
  ) ? ((): void => {
    this
      .document
      .location
      .href = "/" + localeId + this
      .location
      .path();
  })() : void (0);
  protected readonly localeId:           LocaleId                     = inject<LocaleId>(LOCALE_ID);
  protected readonly localeDisplayNames: Intl.DisplayNames            = new Intl.DisplayNames(
    [
      this.localeId,
    ],
    {
      type: "language",
    },
  );
  protected readonly localeIds:          (LocaleId)[]                 = inject<(LocaleId)[]>(LOCALE_IDS);

}
