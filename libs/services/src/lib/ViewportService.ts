import { type ViewportScrollPosition }                                    from "@angular/cdk/scrolling";
import { DOCUMENT, isPlatformBrowser }                                    from "@angular/common";
import { computed, inject, Injectable, PLATFORM_ID, signal, type Signal } from "@angular/core";
import { toSignal }                                                       from "@angular/core/rxjs-interop";
import { type Dimensions }                                                from "@standard/interfaces";
import { fromEvent, map, startWith }                                      from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class ViewportService {

  private readonly document: Document                                          = inject<Document>(DOCUMENT);
  private readonly platformId: NonNullable<unknown>                            = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly dimensions$: Signal<Dimensions | undefined>                 = isPlatformBrowser(this.platformId) && this.document.defaultView ? ((window: Window & typeof globalThis): Signal<Dimensions | undefined> => {
    if (window.visualViewport)
      return toSignal<Dimensions>(
        fromEvent<Event>(
          window.visualViewport,
          "resize",
        ).pipe<Event | null, Dimensions>(
          startWith<Event, [ null ]>(null),
          map<Event | null, Dimensions>(
            (): Dimensions => ({
              height: window.innerHeight,
              width:  window.innerWidth,
            }),
          ),
        ),
      );
    else
      return signal<undefined>(undefined);
  })(this.document.defaultView) : signal<undefined>(undefined);
  private readonly scrollPosition$: Signal<ViewportScrollPosition | undefined> = isPlatformBrowser(this.platformId) && this.document.defaultView ? ((window: Window & typeof globalThis): Signal<ViewportScrollPosition | undefined> => toSignal<ViewportScrollPosition>(
    fromEvent<Event>(
      this.document.defaultView,
      "scroll",
    ).pipe<Event | null, ViewportScrollPosition>(
      startWith<Event, [ null ]>(null),
      map<Event | null, ViewportScrollPosition>(
        (): ViewportScrollPosition => ({
          left: window.scrollX,
          top:  window.scrollY,
        }),
      ),
    ),
  ))(this.document.defaultView) : signal<undefined>(undefined);

  public readonly height$: Signal<number | undefined>     = computed<number | undefined>(
    (): number | undefined => this.dimensions$()?.height,
  );
  public readonly scrollLeft$: Signal<number | undefined> = computed<number | undefined>(
    (): number | undefined => this.scrollPosition$()?.left,
  );
  public readonly scrollTop$: Signal<number | undefined>  = computed<number | undefined>(
    (): number | undefined => this.scrollPosition$()?.top,
  );
  public readonly width$: Signal<number | undefined>      = computed<number | undefined>(
    (): number | undefined => this.dimensions$()?.width,
  );

}
