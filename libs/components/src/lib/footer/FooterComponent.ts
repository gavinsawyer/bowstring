import { DOCUMENT, isPlatformBrowser }                                                                                                                    from "@angular/common";
import { AfterViewInit, Component, ElementRef, inject, NgZone, PLATFORM_ID, Signal, signal, ViewChild, WritableSignal }                                   from "@angular/core";
import { toObservable, toSignal }                                                                                                                         from "@angular/core/rxjs-interop";
import { combineLatest, delayWhen, distinctUntilChanged, EMPTY, fromEvent, map, merge, Observable, Observer, startWith, switchMap, TeardownLogic, timer } from "rxjs";


@Component({
  exportAs:    "standardFooter",
  selector:    "standard--footer",
  standalone:  true,
  styleUrls:   [
    "FooterComponent.sass",
  ],
  templateUrl: "FooterComponent.html",
})
export class FooterComponent implements AfterViewInit {

  @ViewChild("htmlDivElement", {
    read:   ElementRef<HTMLDivElement>,
    static: true,
  })
  private readonly htmlDivElementRef?:    ElementRef<HTMLDivElement>;

  @ViewChild("htmlFooterElement", {
    read:   ElementRef<HTMLElement>,
    static: true,
  })
  private readonly htmlFooterElementRef?: ElementRef<HTMLElement>;

  private readonly afterViewInit$: WritableSignal<boolean> = signal<boolean>(false);
  private readonly document:       Document                = inject<Document>(DOCUMENT);
  private readonly ngZone:         NgZone                  = inject<NgZone>(NgZone);
  private readonly platformId:     NonNullable<unknown>    = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly stuck$: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly bodyHeight$:            Signal<number>  = toSignal<number>(
    new Observable<number>(
      (resizeEventObserver: Observer<number>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
        resizeObserver
          .observe(
            this.document.body,
          );

        return resizeObserver.disconnect;
      })(
        new ResizeObserver(
          (resizeObserverEntries: ResizeObserverEntry[]): void => this.ngZone.run<void>(
            (): void => resizeEventObserver.next(
              resizeObserverEntries[0].target.clientHeight,
            ),
          ),
        ),
      ),
    ).pipe<number, number>(
      startWith<number, [ number ]>(
        this.document.body.clientHeight,
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  );
  protected readonly stuckOrUnsticking$:     Signal<boolean> = toSignal<boolean>(
    toObservable<boolean>(
      this.stuck$,
    ).pipe<boolean, boolean, boolean>(
      delayWhen<boolean>(
        (stuck: boolean): Observable<number> => stuck ? timer(0) : timer(200),
      ),
      startWith<boolean>(
        this.stuck$(),
      ),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  );
  protected readonly footerBottomProperty$:  Signal<number>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    this.document.defaultView ? merge<[ boolean, Event ]>(
      toObservable<boolean>(
        this.afterViewInit$,
      ),
      fromEvent<Event>(
        this.document.defaultView,
        "resize",
      ),
    ).pipe<number, number, number>(
      map<boolean | Event, number>(
        (): number => this.htmlFooterElementRef?.nativeElement ? ((bottomPropertyValue: string): number => bottomPropertyValue.includes("px") ? Number(
          bottomPropertyValue.replace(
            "px",
            "",
          ),
        ) : 0)(
          getComputedStyle(
            this.htmlFooterElementRef.nativeElement,
          ).getPropertyValue("bottom"),
        ) : 0,
      ),
      startWith<number, [ number ]>(
        this.htmlFooterElementRef?.nativeElement ? ((bottomPropertyValue: string): number => bottomPropertyValue.includes("px") ? Number(
          bottomPropertyValue.replace(
            "px",
            "",
          ),
        ) : 0)(
          getComputedStyle(
            this.htmlFooterElementRef.nativeElement,
          ).getPropertyValue("bottom"),
        ) : 0,
      ),
      distinctUntilChanged<number>(),
    ) : EMPTY,
    {
      requireSync: true,
    },
  ) : signal<number>(0);
  protected readonly footerHeight$:          Signal<number>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    toObservable(
      this.afterViewInit$,
    ).pipe<number, number, number>(
      switchMap<boolean, Observable<number>>(
        (): Observable<number> => new Observable<number>(
          (resizeEventObserver: Observer<number>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
            this
              .htmlFooterElementRef && resizeObserver
              .observe(
                this.htmlFooterElementRef.nativeElement,
              );

            return resizeObserver.disconnect;
          })(
            new ResizeObserver(
              (resizeObserverEntries: ResizeObserverEntry[]): void => this.ngZone.run<void>(
                (): void => resizeEventObserver.next(
                  resizeObserverEntries[0].target.clientHeight,
                ),
              ),
            ),
          ),
        ),
      ),
      startWith<number, [ number ]>(
        this.htmlFooterElementRef?.nativeElement.clientHeight || 0,
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<number>(0);
  protected readonly footerOffsetBottom$: Signal<number>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    combineLatest<{ bodyHeight: Observable<number>, footerBottomProperty: Observable<number>, footerHeight: Observable<number> }>(
      {
        bodyHeight:           toObservable<number>(
          this.bodyHeight$,
        ),
        footerBottomProperty: toObservable<number>(
          this.footerBottomProperty$,
        ),
        footerHeight:         toObservable<number>(
          this.footerHeight$,
        ),
      },
    ).pipe<number, number, number>(
      map<{ bodyHeight: number, footerBottomProperty: number, footerHeight: number }, number>(
        (latest: { bodyHeight: number, footerBottomProperty: number, footerHeight: number }): number => latest.bodyHeight - (this.htmlDivElementRef?.nativeElement.offsetTop || 0) - latest.footerBottomProperty - latest.footerHeight,
      ),
      startWith<number, [ number ]>(
        this.bodyHeight$() - (this.htmlDivElementRef?.nativeElement.offsetTop || 0) - this.footerBottomProperty$() - this.footerHeight$(),
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<number>(0);
  protected readonly backdropHeight$:        Signal<number>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    combineLatest<{ footerHeight: Observable<number>, footerBottomProperty: Observable<number>, footerOffsetBottom: Observable<number> }>(
      {
        footerHeight:         toObservable<number>(
          this.footerHeight$,
        ),
        footerBottomProperty: toObservable<number>(
          this.footerBottomProperty$,
        ),
        footerOffsetBottom:   toObservable<number>(
          this.footerOffsetBottom$,
        ),
      },
    ).pipe<number, number, number>(
      map<{ footerHeight: number, footerBottomProperty: number, footerOffsetBottom: number }, number>(
        (latest: { footerHeight: number, footerBottomProperty: number, footerOffsetBottom: number }): number => latest.footerHeight + latest.footerOffsetBottom + latest.footerBottomProperty,
      ),
      startWith<number>(
        this.footerHeight$() + this.footerOffsetBottom$() + this.footerBottomProperty$(),
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<number>(0);
  protected readonly unstickingTranslation$: Signal<number>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    combineLatest<{ bodyHeight: Observable<number>, footerOffsetBottom: Observable<number>, scrollY: Observable<number>, viewportHeight: Observable<number> }>(
      {
        bodyHeight:         toObservable<number>(
          this.bodyHeight$,
        ),
        footerOffsetBottom: toObservable<number>(
          this.footerOffsetBottom$,
        ),
        scrollY:            fromEvent<Event>(
          this.document,
          "scroll",
        ).pipe<number, number, number>(
          map<Event, number>(
            (): number => Math.max(
              this.document.defaultView?.scrollY || 0,
              0,
            ),
          ),
          startWith<number, [ number ]>(
            Math.max(
              this.document.defaultView?.scrollY || 0,
              0,
            ),
          ),
          distinctUntilChanged<number>(),
        ),
        viewportHeight:     this.document.defaultView ? fromEvent<Event>(
          this.document.defaultView,
          "resize",
        ).pipe<number, number, number>(
          map<Event, number>(
            (): number => this.document.defaultView?.innerHeight || 0,
          ),
          startWith<number, [ number ]>(
            this.document.defaultView?.innerHeight || 0,
          ),
          distinctUntilChanged<number>(),
        ) : EMPTY,
      },
    ).pipe<number, number, number>(
      map<{ bodyHeight: number, footerOffsetBottom: number, scrollY: number, viewportHeight: number }, number>(
        (latest: { bodyHeight: number, footerOffsetBottom: number, scrollY: number, viewportHeight: number }): number => Math.max(
          latest.bodyHeight - latest.scrollY - latest.viewportHeight - latest.footerOffsetBottom,
          0,
        ),
      ),
      startWith<number, [ number ]>(
        Math.max(
          this.bodyHeight$() - Math.max(
            this.document.defaultView?.scrollY || 0,
            0,
          ) - (this.document.defaultView?.innerHeight || 0) - this.footerOffsetBottom$(),
          0,
        ),
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<number>(0);
  protected readonly raised$:                Signal<boolean> = toSignal<boolean>(
    toObservable<number>(
      this.unstickingTranslation$,
    ).pipe<boolean, boolean, boolean>(
      map<number, boolean>(
        (unstickingTranslation: number): boolean => unstickingTranslation !== 0,
      ),
      startWith<boolean, [ boolean ]>(false),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  );
  protected readonly raisedOrLowering$:      Signal<boolean> = toSignal<boolean>(
    toObservable<boolean>(
      this.raised$,
    ).pipe<boolean, boolean, boolean>(
      delayWhen<boolean>(
        (stuck: boolean): Observable<number> => stuck ? timer(0) : timer(200),
      ),
      startWith<boolean>(false),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  );

  public ngAfterViewInit(): void {
    this
      .afterViewInit$
      .set(true);
  }

}
