import { DOCUMENT, isPlatformBrowser, NgTemplateOutlet }                                                                                                                                      from "@angular/common";
import { afterRender, Component, computed, type ElementRef, inject, Injector, model, type ModelSignal, PLATFORM_ID, runInInjectionContext, type Signal, signal, type TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                             from "@angular/core/rxjs-interop";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, RoundedDirective }                                                                                                     from "@standard/directives";
import { type Dimensions }                                                                                                                                                                    from "@standard/interfaces";
import { ViewportService }                                                                                                                                                                    from "@standard/services";
import { combineLatestWith, delayWhen, filter, map, Observable, type Observer, switchMap, type TeardownLogic, timer }                                                                         from "rxjs";
import { ButtonComponent }                                                                                                                                                                    from "../menus and actions";
import { SymbolComponent }                                                                                                                                                                    from "../symbol/SymbolComponent";


@Component(
  {
    host:           {
      "[class.raisedOrLoweringWhenStuckOrUnsticking]":      "raisedOrLoweringWhenStuckOrUnsticking$()",
      "[class.raisedWhenStuckOrUnsticking]":                "raisedWhenStuckOrUnsticking$()",
      "[class.stuckOrUnsticking]":                          "stuckOrUnsticking$()",
      "[class.stuck]":                                      "stuckModelWithTransform$()",
      "[style.--standard--footer--height]":                 "height$()",
      "[style.--standard--footer--raising-scale]":          "raisingScale$()",
      "[style.--standard--footer--unsticking-translation]": "unstickingTranslation$()",
    },
    hostDirectives: [
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
      {
        directive: GlassDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:        [
      ButtonComponent,
      NgTemplateOutlet,
      SymbolComponent,
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
    afterRender(
      (): void => {
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlElementRef$(),
        );
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
  private readonly htmlElementRef$: Signal<ElementRef<HTMLElement>>               = viewChild.required<ElementRef<HTMLElement>>("htmlElement");
  private readonly platformId: NonNullable<unknown>                               = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly dimensions$: Signal<Dimensions>                                = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<Dimensions, { "height": 0, "width": 0 }>(
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
  ) : signal<{ "height": 0, "width": 0 }>(
    {
      height: 0,
      width:  0,
    },
  );
  private readonly injector: Injector                                             = inject<Injector>(Injector);
  private readonly viewportService: ViewportService                               = inject<ViewportService>(ViewportService);
  private readonly width$: Signal<number>                                         = computed<number>(
    (): number => this.dimensions$().width,
  );

  protected readonly height$: Signal<number> = computed<number>(
    (): number => this.dimensions$().height,
  );

  public readonly stuckModelWithTransform$: Signal<boolean> = computed<boolean>(
    (): boolean => ((stuck?: "" | boolean | `${ boolean }`): boolean => stuck === "" || stuck === true || stuck === "true" || stuck !== "false" && false)(
      this.stuckModel$(),
    ),
  );

  protected readonly unstickingTranslation$: Signal<number>                  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number, 0>(
    toObservable<boolean>(
      this.stuckModelWithTransform$,
    ).pipe<true, number>(
      filter<boolean, true>(
        (stuck: boolean): stuck is true => stuck,
      ),
      switchMap<true, Observable<number>>(
        (): Observable<number> => runInInjectionContext<Observable<number>>(
          this.injector,
          (): Observable<number> => toObservable<ElementRef<HTMLDivElement>>(
            this.backdropHtmlDivElementRef$,
          ).pipe<[ ElementRef<HTMLDivElement>, number | undefined, number | undefined, number, number ], number>(
            combineLatestWith<ElementRef<HTMLDivElement>, [ number | undefined, number | undefined, number, number ]>(
              toObservable<number | undefined>(
                this.viewportService.height$,
              ),
              toObservable<number | undefined>(
                this.viewportService.scrollTop$,
              ),
              toObservable<number>(
                this.bodyHeight$,
              ),
              toObservable<number>(
                this.height$,
              ),
            ),
            map<[ ElementRef<HTMLDivElement>, number | undefined, number | undefined, number, number ], number>(
              ([ backdropHtmlDivElementRef, viewportHeight ]: [ ElementRef<HTMLDivElement>, number | undefined, number | undefined, number, number ]): number => Math.round(
                Math.max(
                  backdropHtmlDivElementRef.nativeElement.getBoundingClientRect().bottom - (viewportHeight || 0) + Math.max(
                    0,
                    parseInt(
                      backdropHtmlDivElementRef.nativeElement.computedStyleMap().get("margin-bottom")?.toString() || "0",
                    ) + parseInt(
                        backdropHtmlDivElementRef.nativeElement.computedStyleMap().get("--safe-area-inset-bottom")?.toString() || "0",
                      ),
                  ),
                  0,
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    {
      initialValue: 0,
    },
  ) : signal<0>(0);
  protected readonly raisedWhenStuckOrUnsticking$: Signal<boolean>           = toSignal<boolean, false>(
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
  protected readonly raisingScale$: Signal<number>                           = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number, 0>(
    toObservable<number>(
      this.width$,
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
  protected readonly roundedContainerDirective: RoundedDirective             = inject<RoundedDirective>(RoundedDirective);
  protected readonly stuckOrUnsticking$: Signal<boolean>                     = toSignal<boolean, false>(
    toObservable<boolean>(
      this.stuckModelWithTransform$,
    ).pipe<boolean, boolean>(
      delayWhen<boolean>(
        (stuck: boolean): Observable<number> => stuck ? timer(0) : timer(360),
      ),
      map<boolean, boolean>(
        (): boolean => this.stuckModelWithTransform$(),
      ),
    ),
    {
      initialValue: false,
    },
  );

  public readonly disclosureControlTemplateRef$: Signal<TemplateRef<never>>           = viewChild.required<TemplateRef<never>>("disclosureControlTemplate");
  public readonly stuckModel$: ModelSignal<"" | boolean | `${ boolean }` | undefined> = model<"" | boolean | `${ boolean }` | undefined>(
    false,
    {
      alias: "stuck",
    },
  );

}
