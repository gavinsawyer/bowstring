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

  private readonly document: Document                                                  = inject<Document>(DOCUMENT);
  private readonly platformId: NonNullable<unknown>                                    = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly viewportDimensions$: Signal<Dimensions | undefined>                 = isPlatformBrowser(
    this.platformId,
  ) && this.document.defaultView?.visualViewport ? ((window: Window & typeof globalThis): Signal<Dimensions | undefined> => toSignal<Dimensions, Dimensions>(
    fromEvent<Event>(
      this.document.defaultView.visualViewport,
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
    {
      initialValue: {
        height: this.document.defaultView.innerHeight,
        width:  this.document.defaultView.innerWidth,
      },
    },
  ))(this.document.defaultView) : signal<undefined>(undefined);
  private readonly viewportScrollPosition$: Signal<ViewportScrollPosition | undefined> = isPlatformBrowser(
    this.platformId,
  ) && this.document.defaultView ? ((window: Window & typeof globalThis): Signal<ViewportScrollPosition | undefined> => toSignal<ViewportScrollPosition, ViewportScrollPosition>(
    fromEvent<Event>(
      this.document.defaultView,
      "scroll",
    ).pipe<ViewportScrollPosition>(
      map<Event, ViewportScrollPosition>(
        (): ViewportScrollPosition => ({
          left: window.scrollX,
          top:  window.scrollY,
        }),
      ),
    ),
    {
      initialValue: {
        left: this.document.defaultView.scrollX,
        top:  this.document.defaultView.scrollY,
      },
    },
  ))(this.document.defaultView) : signal<undefined>(undefined);

  public readonly height$: Signal<number | undefined>     = computed<number | undefined>(
    (): number | undefined => this.viewportDimensions$()?.height,
  );
  public readonly scrollLeft$: Signal<number | undefined> = computed<number | undefined>(
    (): number | undefined => this.viewportScrollPosition$()?.left,
  );
  public readonly scrollTop$: Signal<number | undefined>  = computed<number | undefined>(
    (): number | undefined => this.viewportScrollPosition$()?.top,
  );
  public readonly width$: Signal<number | undefined>      = computed<number | undefined>(
    (): number | undefined => this.viewportDimensions$()?.width,
  );

}
