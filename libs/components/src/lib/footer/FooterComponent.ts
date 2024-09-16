import { DOCUMENT, isPlatformBrowser }                                                                                                   from "@angular/common";
import { Component, computed, effect, type ElementRef, inject, model, type ModelSignal, PLATFORM_ID, type Signal, signal, viewChild }    from "@angular/core";
import { toObservable, toSignal }                                                                                                        from "@angular/core/rxjs-interop";
import { ContainerDirective, ElevatedContainerDirective, FlexboxContainerDirective, GlassContainerDirective, RoundedContainerDirective } from "@standard/directives";
import { type Dimensions }                                                                                                               from "@standard/interfaces";
import { ViewportService }                                                                                                               from "@standard/services";
import { combineLatestWith, delayWhen, map, Observable, type Observer, switchMap, type TeardownLogic, timer }                            from "rxjs";


@Component(
  {
    host:           {
      "[class.raisedOrLoweringWhenStuckOrUnsticking]":      "raisedOrLoweringWhenStuckOrUnsticking$()",
      "[class.raisedWhenStuckOrUnsticking]":                "raisedWhenStuckOrUnsticking$()",
      "[class.stuck]":                                      "stuckModelWithTransform$()",
      "[class.stuckOrUnsticking]":                          "stuckOrUnsticking$()",
      "[style.--standard--footer--height]":                 "footerHeight$()",
      "[style.--standard--footer--raising-scale]":          "raisingScale$()",
      "[style.--standard--footer--unsticking-translation]": "unstickingTranslation$()",
    },
    hostDirectives: [
      {
        directive: ElevatedContainerDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "collapsable",
          "columnGap",
          "flexDirection",
          "flexWrap",
          "justifyContent",
          "listenToScrollEvent",
          "rowGap",
        ],
      },
      {
        directive: GlassContainerDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: RoundedContainerDirective,
        inputs:    [
          "borderRadiusFactor",
        ],
      },
    ],
    selector:       "standard--footer",
    standalone:     true,
    styleUrls:      [
      "FooterComponent.sass",
    ],
    templateUrl:    "FooterComponent.html",
  },
)
export class FooterComponent {

  constructor() {
    effect(
      (): void => {
        this.containerDirective.htmlElementRef$.set(
          this.htmlElementRef$(),
        );
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlElementRef$(),
        );
        this.flexboxContainerDirective.htmlElementRef$.set(
          this.htmlElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly backdropHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("backdropHtmlDivElement");
  private readonly document: Document                                             = inject<Document>(DOCUMENT);
  private readonly bodyHeight$: Signal<number>                                    = toSignal<number, number>(
    new Observable<number>(
      (resizeEventObserver: Observer<number>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
        resizeObserver.observe(
          this.document.body,
        );

        return (): void => resizeObserver.disconnect();
      })(
        new ResizeObserver(
          (resizeObserverEntries: ResizeObserverEntry[]): void => resizeEventObserver.next(
            resizeObserverEntries[0].target.clientHeight,
          ),
        ),
      ),
    ),
    {
      initialValue: this.document.body.clientHeight,
    },
  );
  private readonly containerDirective: ContainerDirective                         = inject<ContainerDirective>(ContainerDirective);
  private readonly htmlElementRef$: Signal<ElementRef<HTMLElement>>               = viewChild.required<ElementRef<HTMLElement>>("htmlElement");
  private readonly platformId: NonNullable<unknown>                               = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly footerDimensions$: Signal<Dimensions>                          = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<Dimensions, { height: 0, width: 0 }>(
    toObservable<ElementRef<HTMLElement>>(
      this.htmlElementRef$,
    ).pipe<Dimensions>(
      switchMap<ElementRef<HTMLElement>, Observable<Dimensions>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<Dimensions> => new Observable<Dimensions>(
          (resizeEventObserver: Observer<Dimensions>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
            resizeObserver.observe(
              htmlElementRef.nativeElement,
            );

            return (): void => resizeObserver.disconnect();
          })(
            new ResizeObserver(
              (resizeObserverEntries: ResizeObserverEntry[]): void => resizeEventObserver.next(
                {
                  height: resizeObserverEntries[0].target.clientHeight,
                  width:  resizeObserverEntries[0].target.clientWidth,
                },
              ),
            ),
          ),
        ),
      ),
    ),
    {
      initialValue: {
        height: 0,
        width:  0,
      },
    },
  ) : signal<{ height: 0, width: 0 }>(
    {
      height: 0,
      width:  0,
    },
  );
  private readonly flexboxContainerDirective: FlexboxContainerDirective           = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly footerWidth$: Signal<number>                                   = computed<number>(
    (): number => this.footerDimensions$().width,
  );
  private readonly viewportService: ViewportService                               = inject<ViewportService>(ViewportService);

  protected readonly footerHeight$: Signal<number>                        = computed<number>(
    (): number => this.footerDimensions$().height,
  );
  protected readonly footerOffsetBottom$: Signal<number>                  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number, number>(
    toObservable<ElementRef<HTMLDivElement>>(
      this.backdropHtmlDivElementRef$,
    ).pipe(
      combineLatestWith<ElementRef<HTMLDivElement>, [ number, number, number | undefined ]>(
        toObservable<number>(
          this.bodyHeight$,
        ),
        toObservable<number>(
          this.footerHeight$,
        ),
        toObservable<number | undefined>(
          this.viewportService.scrollTop$,
        ),
      ),
      map<[ ElementRef<HTMLDivElement>, number, number, number | undefined ], number>(
        ([ backdropHtmlDivElementRef, bodyHeight, , viewportScrollTop ]: [ ElementRef<HTMLDivElement>, number, number, number | undefined ]): number => bodyHeight - backdropHtmlDivElementRef.nativeElement.getBoundingClientRect().bottom - Math.max(
          viewportScrollTop || 0,
          0,
        ),
      ),
    ),
    {
      initialValue: 0,
    },
  ) : signal<0>(0);
  protected readonly raisingScale$: Signal<number>                        = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number, number>(
    toObservable<number>(
      this.footerWidth$,
    ).pipe<[ number, number | undefined ], number>(
      combineLatestWith<number, [ number | undefined ]>(
        toObservable<number | undefined>(
          this.viewportService.width$,
        ),
      ),
      map<[ number, number | undefined ], number>(
        ([ footerWidth, viewportWidth ]: [ number, number | undefined ]): number => ((viewportWidth || footerWidth) - footerWidth) / (viewportWidth || footerWidth) / 2.6180339887,
      ),
    ),
    {
      initialValue: 0,
    },
  ) : signal<0>(0);
  protected readonly roundedContainerDirective: RoundedContainerDirective = inject<RoundedContainerDirective>(RoundedContainerDirective);

  public readonly stuckModelWithTransform$: Signal<boolean | undefined> = computed<boolean | undefined>(
    (): boolean | undefined => ((stuck?: "" | boolean | `${ boolean }`): boolean | undefined => stuck === "" || stuck === true || stuck === "true" || stuck !== "false" && stuck)(
      this.stuckModel$(),
    ),
  );

  protected readonly stuckOrUnsticking$: Signal<boolean | undefined> = toSignal<boolean | undefined, undefined>(
    toObservable<boolean | undefined>(
      this.stuckModelWithTransform$,
    ).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (stuck?: boolean): Observable<number> => stuck ? timer(0) : timer(360),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.stuckModelWithTransform$(),
      ),
    ),
    {
      initialValue: undefined,
    },
  );
  protected readonly unstickingTranslation$: Signal<number>          = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number, number>(
    toObservable<number>(
      this.bodyHeight$,
    ).pipe<[ number, number, number | undefined, number | undefined ], number>(
      combineLatestWith<number, [ number, number | undefined, number | undefined ]>(
        toObservable<number>(
          this.footerOffsetBottom$,
        ),
        toObservable<number | undefined>(
          this.viewportService.height$,
        ),
        toObservable<number | undefined>(
          this.viewportService.scrollTop$,
        ),
      ),
      map<[ number, number, number | undefined, number | undefined ], number>(
        ([ bodyHeight, footerOffsetBottom, viewportHeight, viewportScrollTop ]: [ number, number, number | undefined, number | undefined ]): number => Math.round(
          Math.max(
            bodyHeight - footerOffsetBottom - (viewportHeight || 0) - Math.max(
              viewportScrollTop || 0,
              0,
            ) + parseInt(
              getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-bottom") || "0",
            ),
            0,
          ),
        ),
      ),
    ),
    {
      initialValue: 0,
    },
  ) : signal<0>(0);

  public readonly raisedWhenStuckOrUnsticking$: Signal<boolean> = toSignal<boolean, false>(
    toObservable<number>(
      this.unstickingTranslation$,
    ).pipe<boolean>(
      map<number, boolean>(
        (unstickingTranslation: number): boolean => unstickingTranslation !== 0,
      ),
    ),
    {
      initialValue: false,
    },
  );

  protected readonly raisedOrLoweringWhenStuckOrUnsticking$: Signal<boolean> = toSignal<boolean, false>(
    toObservable<boolean>(
      this.raisedWhenStuckOrUnsticking$,
    ).pipe<boolean, boolean>(
      delayWhen<boolean>(
        (raisedWhenStuckOrUnsticking: boolean): Observable<number> => raisedWhenStuckOrUnsticking ? timer(0) : timer(360),
      ),
      map<boolean, boolean>(
        (): boolean => this.raisedWhenStuckOrUnsticking$(),
      ),
    ),
    {
      initialValue: false,
    },
  );

  public readonly stuckModel$: ModelSignal<"" | boolean | `${ boolean }` | undefined> = model<"" | boolean | `${ boolean }` | undefined>(
    false,
    {
      alias: "stuck",
    },
  );

}
