import { ViewportScrollPosition }                                    from "@angular/cdk/scrolling";
import { DOCUMENT, isPlatformBrowser }                               from "@angular/common";
import { computed, inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                                  from "@angular/core/rxjs-interop";
import { Dimensions }                                                from "@standard/interfaces";
import { fromEvent, map, startWith }                                 from "rxjs";


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
  ) && this.document.defaultView?.visualViewport ? toSignal<Dimensions | undefined, Dimensions>(
    fromEvent<Event>(
      this.document.defaultView.visualViewport,
      "resize",
    ).pipe<Event | null, Dimensions | undefined>(
      startWith<Event, [ null ]>(null),
      map<Event | null, Dimensions | undefined>(
        (): Dimensions | undefined => this.document.defaultView ? {
          height: this.document.defaultView.innerHeight,
          width:  this.document.defaultView.innerWidth,
        } : undefined,
      ),
    ),
    {
      initialValue: {
        height: this.document.defaultView.innerHeight,
        width:  this.document.defaultView.innerWidth,
      },
    },
  ) : signal<undefined>(undefined);
  private readonly viewportScrollPosition$: Signal<ViewportScrollPosition | undefined> = isPlatformBrowser(
    this.platformId,
  ) && this.document.defaultView ? toSignal<ViewportScrollPosition | undefined, ViewportScrollPosition>(
    fromEvent<Event>(
      this.document.defaultView,
      "scroll",
    ).pipe<ViewportScrollPosition | undefined>(
      map<Event, ViewportScrollPosition | undefined>(
        (): ViewportScrollPosition | undefined => this.document.defaultView ? {
          left: this.document.defaultView.scrollX,
          top:  this.document.defaultView.scrollY,
        } : undefined,
      ),
    ),
    {
      initialValue: {
        left: this.document.defaultView.scrollX,
        top:  this.document.defaultView.scrollY,
      },
    },
  ) : signal<undefined>(undefined);

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
