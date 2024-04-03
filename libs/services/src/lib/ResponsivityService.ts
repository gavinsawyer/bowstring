import { BreakpointObserver, BreakpointState }             from "@angular/cdk/layout";
import { DOCUMENT, isPlatformBrowser }                     from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { distinctUntilChanged, fromEvent, map, startWith } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ResponsivityService {

  private readonly breakpointObserver: BreakpointObserver   = inject<BreakpointObserver>(BreakpointObserver);
  private readonly document:           Document             = inject<Document>(DOCUMENT);
  private readonly platformId:         NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly getPastRemBreakpointSignal:     (remBreakpoint: number) => Signal<boolean>     = (remBreakpoint: number): Signal<boolean> => isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean>(
    this.breakpointObserver.observe(`(min-width: ${remBreakpoint}rem)`).pipe<boolean, boolean, boolean>(
      map<BreakpointState, boolean>(
        (breakpointState: BreakpointState): boolean => breakpointState.matches,
      ),
      startWith<boolean>(
        this.breakpointObserver.isMatched(`(min-width: ${remBreakpoint}rem)`),
      ),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<boolean>(true);
  public readonly getPastRemScrollPositionSignal: (remScrollPosition: number) => Signal<boolean> = (remScrollPosition: number): Signal<boolean> => isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean>(
    fromEvent<Event>(
      this.document,
      "scroll",
    ).pipe<boolean, boolean, boolean>(
      map<Event, boolean>(
        (): boolean => (this.document.defaultView?.scrollY || 0) >= remScrollPosition * 16,
      ),
      startWith<boolean, [ boolean ]>(
        (this.document.defaultView?.scrollY || 0) >= remScrollPosition * 16,
      ),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<boolean>(false);

}
