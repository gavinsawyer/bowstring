import { DOCUMENT, isPlatformBrowser, Location }                                                      from "@angular/common";
import { Component, effect, type ElementRef, inject, LOCALE_ID, PLATFORM_ID, type Signal, viewChild } from "@angular/core";
import { FlexboxContainerDirective }                                                                  from "@standard/directives";
import { BRAND, GIT_INFO, PACKAGE_VERSION }                                                           from "@standard/injection-tokens";
import { ResponsivityService }                                                                        from "@standard/services";
import { type Brand }                                                                                 from "@standard/types";
import { type GitInfo }                                                                               from "git-describe";
import { LOCALE_IDS }                                                                                 from "../../../injection tokens";
import { type LocaleId }                                                                              from "../../../types";


@Component(
  {
    hostDirectives: [
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "columnGap",
          "flexDirection",
          "flexWrap",
          "justifyContent",
          "listenToScrollEvent",
          "rowGap",
          "scrollLeft",
          "scrollTop",
        ],
      },
    ],
    selector:       "standard-website--root",
    styleUrls:      [
      "RootComponent.sass",
    ],
    templateUrl:    "RootComponent.html",
  },
)
export class RootComponent {

  constructor() {
    effect(
      (): void => this.flexboxContainerDirective.htmlElementRef$.set(
        this.htmlDivElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly document: Document                                     = inject<Document>(DOCUMENT);
  private readonly flexboxContainerDirective: FlexboxContainerDirective   = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly location: Location                                     = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown>                       = inject<NonNullable<unknown>>(PLATFORM_ID);

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
      this.document.location.href = `/${ localeId + this.location.path() }`;
    })() : void (0);
  }

}
