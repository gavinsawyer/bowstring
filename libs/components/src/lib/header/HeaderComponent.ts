import { DOCUMENT, isPlatformBrowser }                                                   from "@angular/common";
import { Component, inject, PLATFORM_ID, signal, Signal }                                from "@angular/core";
import { toObservable, toSignal }                                                        from "@angular/core/rxjs-interop";
import { RouterLink, RouterLinkActive }                                                  from "@angular/router";
import * as brand                                                                        from "@standard/brand";
import { BRAND }                                                                         from "@standard/injection-tokens";
import { delayWhen, distinctUntilChanged, fromEvent, map, Observable, startWith, timer } from "rxjs";
import { LinkComponent }                                                                 from "../link/LinkComponent";


@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    LinkComponent,
  ],
  selector:    "standard--header",
  standalone:  true,
  styleUrls:   [
    "HeaderComponent.sass",
  ],
  templateUrl: "HeaderComponent.html",
})
export class HeaderComponent {

  private readonly document:            Document             = inject<Document>(DOCUMENT);
  private readonly platformId:          NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly brand:             typeof brand    = inject<typeof brand>(BRAND);
  protected readonly raised$:           Signal<boolean> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean>(
    fromEvent<Event>(
      this.document,
      "scroll",
    ).pipe<boolean, boolean, boolean>(
      map<Event, boolean>(
        (): boolean => (this.document.defaultView?.scrollY || 0) >= 48,
      ),
      startWith<boolean, [ boolean ]>(
        (this.document.defaultView?.scrollY || 0) >= 48,
      ),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<boolean>(false);
  protected readonly raisedOrLowering$: Signal<boolean> = toSignal<boolean>(
    toObservable<boolean>(
      this.raised$,
    ).pipe<boolean, boolean>(
      delayWhen<boolean>(
        (raised: boolean): Observable<number> => raised ? timer(0) : timer(200),
      ),
      startWith<boolean>(false),
    ),
    {
      requireSync: true,
    },
  );


}
