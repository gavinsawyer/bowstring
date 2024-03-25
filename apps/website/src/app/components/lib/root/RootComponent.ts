import { BreakpointObserver, BreakpointState }               from "@angular/cdk/layout";
import { isPlatformBrowser }                                         from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                                  from "@angular/core/rxjs-interop";
import { GIT_INFO, PACKAGE_VERSION }                         from "@standard/injection-tokens";
import { ResponsivityService }                               from "@standard/services";
import { GitInfo }                                           from "git-describe";
import { map, startWith }                                    from "rxjs";
import project                                               from "../../../../../project.json";


@Component({
  selector:    "standard-website--root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
})
export class RootComponent {

  private readonly breakpointObserver: BreakpointObserver = inject<BreakpointObserver>(BreakpointObserver);

  public readonly gitInfo:             Partial<GitInfo>                            = inject<Partial<GitInfo>>(GIT_INFO);
  public readonly localeId:            keyof typeof project.i18n.locales | "en-US" = inject<keyof typeof project.i18n.locales | "en-US">(LOCALE_ID);
  public readonly packageVersion:      string                                      = inject<string>(PACKAGE_VERSION);
  public readonly responsivityService: ResponsivityService                         = inject<ResponsivityService>(ResponsivityService);
  public readonly footerExpanded$:     Signal<boolean>                             = isPlatformBrowser(inject<object>(PLATFORM_ID)) ? toSignal(
    this
      .breakpointObserver
      .observe("(min-width: 46rem)")
      .pipe<boolean, boolean>(
        map<BreakpointState, boolean>(
          (breakpointState: BreakpointState): boolean => breakpointState
            .matches,
        ),
        startWith<boolean>(
          this
            .breakpointObserver
            .isMatched("(min-width: 46rem)"),
        ),
      ),
    {
      requireSync: true,
    },
  ) : signal<boolean>(false);

}
