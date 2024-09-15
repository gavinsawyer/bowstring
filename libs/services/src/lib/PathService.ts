import { Location }                                                                                                                                                                                                                                                                                         from "@angular/common";
import { inject, Injectable, LOCALE_ID, Signal }                                                                                                                                                                                                                                                            from "@angular/core";
import { toSignal }                                                                                                                                                                                                                                                                                         from "@angular/core/rxjs-interop";
import { ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, RoutesRecognized, Scroll } from "@angular/router";
import { filter, map }                                                                                                                                                                                                                                                                                      from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class PathService {

  private readonly localeId: string   = inject<string>(LOCALE_ID);
  private readonly location: Location = inject<Location>(Location);
  private readonly router: Router     = inject<Router>(Router);

  public readonly path$: Signal<string> = toSignal<string, string>(
    this.router.events.pipe<NavigationEnd, string>(
      filter<RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd, NavigationEnd>(
        (routerEvent: RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd,
      ),
      map<NavigationEnd, string>(
        (navigationEnd: NavigationEnd): string => `/${ this.localeId + navigationEnd.url.split("?")[0] }`,
      ),
    ),
    {
      initialValue: `/${ this.localeId + this.location.path() }`,
    },
  );

}
