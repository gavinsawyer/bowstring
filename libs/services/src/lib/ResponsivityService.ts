import { BreakpointObserver, BreakpointState }             from "@angular/cdk/layout";
import { isPlatformBrowser }                               from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { distinctUntilChanged, map, startWith }            from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ResponsivityService {

  private readonly breakpointObserver: BreakpointObserver   = inject<BreakpointObserver>(BreakpointObserver);
  private readonly platformId:         NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly pastMediumBreakpoint$: Signal<boolean> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean>(
    this.breakpointObserver.observe(`(min-width: 51.5967477427rem)`).pipe<boolean, boolean, boolean>(
      map<BreakpointState, boolean>(
        (breakpointState: BreakpointState): boolean => breakpointState.matches,
      ),
      startWith<boolean>(
        this.breakpointObserver.isMatched(`(min-width: 51.5967477427rem)`),
      ),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<boolean>(true);

}
