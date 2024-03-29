import { BreakpointObserver, BreakpointState }             from "@angular/cdk/layout";
import { isPlatformBrowser }                               from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { map, startWith }                                  from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ResponsivityService {

  private readonly breakpointObserver: BreakpointObserver   = inject<BreakpointObserver>(BreakpointObserver);
  private readonly platformId:         NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly getBreakpointSignal: (minWidth: string) => Signal<boolean> = (minWidth: string): Signal<boolean> => isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean>(
    this.breakpointObserver.observe(`(min-width: ${ minWidth })`).pipe<boolean, boolean>(
      map<BreakpointState, boolean>(
        (breakpointState: BreakpointState): boolean => breakpointState.matches,
      ),
      startWith<boolean>(
        this.breakpointObserver.isMatched(`(min-width: ${ minWidth })`),
      ),
    ),
    {
      requireSync: true,
    },
  ) : signal<boolean>(true);

}
