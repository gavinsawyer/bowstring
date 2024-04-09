import { BreakpointObserver, BreakpointState }                       from "@angular/cdk/layout";
import { DOCUMENT, isPlatformBrowser, Location }                     from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                                  from "@angular/core/rxjs-interop";
import { GIT_INFO, PACKAGE_VERSION }                                 from "@standard/injection-tokens";
import { GitInfo }                                                   from "git-describe";
import { distinctUntilChanged, map, startWith }                      from "rxjs";
import project                                                       from "../../../../../project.json";
import { LOCALES }                                                   from "../../../injection tokens";


@Component({
  selector:    "standard-website--root",
  styleUrls:   [
    "RootComponent.sass",
  ],
  templateUrl: "RootComponent.html",
})
export class RootComponent {

  private readonly breakpointObserver: BreakpointObserver   = inject<BreakpointObserver>(BreakpointObserver);
  private readonly document:           Document             = inject<Document>(DOCUMENT);
  private readonly location:           Location             = inject<Location>(Location);
  private readonly platformId:         NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly changeLocale:         (locale: keyof typeof project.i18n.locales | "en-US") => void = (locale: keyof typeof project.i18n.locales | "en-US"): void => isPlatformBrowser(
    this.platformId,
  ) ? ((): void => {
    this
      .document
      .location
      .href = "/" + locale + this
      .location
      .path();
  })() : void (0);
  protected readonly gitInfo:              Partial<GitInfo>                                              = inject<Partial<GitInfo>>(GIT_INFO);
  protected readonly localeId:             keyof typeof project.i18n.locales | "en-US"                   = inject<keyof typeof project.i18n.locales | "en-US">(LOCALE_ID);
  protected readonly localeDisplayNames:   Intl.DisplayNames                                             = new Intl.DisplayNames(
    [
      this.localeId,
    ],
    {
      type: "language",
    },
  );
  protected readonly locales:              (keyof typeof project.i18n.locales | "en-US")[]               = inject<(keyof typeof project.i18n.locales | "en-US")[]>(LOCALES);
  protected readonly packageVersion:       string                                                        = inject<string>(PACKAGE_VERSION);
  protected readonly past52remBreakpoint$: Signal<boolean> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean>(
    this.breakpointObserver.observe(`(min-width: 52rem)`).pipe<boolean, boolean, boolean>(
      map<BreakpointState, boolean>(
        (breakpointState: BreakpointState): boolean => breakpointState.matches,
      ),
      startWith<boolean>(
        this.breakpointObserver.isMatched(`(min-width: 52rem)`),
      ),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<boolean>(true);

}
