import { DOCUMENT, isPlatformBrowser, NgTemplateOutlet }                                                                                                                                      from "@angular/common";
import { afterRender, Component, computed, type ElementRef, inject, Injector, model, type ModelSignal, PLATFORM_ID, runInInjectionContext, type Signal, signal, type TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                             from "@angular/core/rxjs-interop";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, RoundedDirective }                                                                                                     from "@standard/directives";
import { type Dimensions, type SymbolPaths }                                                                                                                                                  from "@standard/interfaces";
import { ViewportService }                                                                                                                                                                    from "@standard/services";
import loadSymbolPaths                                                                                                                                                                        from "@standard/symbol-paths";
import { combineLatestWith, delayWhen, filter, map, Observable, type Observer, switchMap, type TeardownLogic, timer }                                                                         from "rxjs";
import { fromPromise }                                                                                                                                                                        from "rxjs/internal/observable/innerFrom";


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
      NgTemplateOutlet,
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
      (): void => this.roundedContainerDirective.htmlElementRef$.set(this.htmlElementRef$()),
    );
  }

  private readonly backdropHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("backdropHtmlDivElement");
  private readonly document: Document                                             = inject<Document>(DOCUMENT);
  private readonly platformId: NonNullable<unknown>                               = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly bodyHeight$: Signal<number | undefined>                        = isPlatformBrowser(this.platformId) ? toSignal<number>(
    new Observable<number>(
      (resizeEventObserver: Observer<number>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
        resizeObserver.observe(this.document.body);

        return (): void => resizeObserver.disconnect();
      })(
        new ResizeObserver(
          (resizeObserverEntries: ResizeObserverEntry[]): void => resizeEventObserver.next(resizeObserverEntries[0].target.clientHeight),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  private readonly htmlElementRef$: Signal<ElementRef<HTMLElement>>               = viewChild.required<ElementRef<HTMLElement>>("htmlElement");
  private readonly dimensions$: Signal<Dimensions | undefined>                    = isPlatformBrowser(this.platformId) ? toSignal<Dimensions>(
    toObservable<ElementRef<HTMLElement>>(this.htmlElementRef$).pipe<Dimensions>(
      switchMap<ElementRef<HTMLElement>, Observable<Dimensions>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<Dimensions> => new Observable<Dimensions>(
          (resizeEventObserver: Observer<Dimensions>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
            resizeObserver.observe(htmlElementRef.nativeElement);

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
  ) : signal<undefined>(undefined);
  private readonly injector: Injector                                             = inject<Injector>(Injector);
  private readonly viewportService: ViewportService                               = inject<ViewportService>(ViewportService);
  private readonly width$: Signal<number | undefined>                             = computed<number | undefined>(
    (): number | undefined => this.dimensions$()?.width,
  );

  protected readonly chevronDownSymbolPaths$: Signal<SymbolPaths | undefined> = toSignal<SymbolPaths>(
    fromPromise<SymbolPaths>(
      loadSymbolPaths("ChevronDown"),
    ),
  );
  protected readonly chevronUpSymbolPaths$: Signal<SymbolPaths | undefined>   = toSignal<SymbolPaths>(
    fromPromise<SymbolPaths>(
      loadSymbolPaths("ChevronUp"),
    ),
  );


  protected readonly height$: Signal<number | undefined> = computed<number | undefined>(
    (): number | undefined => this.dimensions$()?.height,
  );

  public readonly stuckModelWithTransform$: Signal<boolean | undefined> = computed<boolean | undefined>(
    (): boolean | undefined => ((stuck?: "" | boolean | `${ boolean }`): boolean | undefined => {
      if (stuck !== undefined)
        return stuck === "" || stuck === true || stuck === "true" || stuck !== "false" && false;
      else
        return undefined;
    })(this.stuckModel$()),
  );

  protected readonly unstickingTranslation$: Signal<number | undefined>                  = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<boolean | undefined>(this.stuckModelWithTransform$).pipe<true, number>(
      filter<boolean | undefined, true>(
        (stuck?: boolean): stuck is true => stuck === true,
      ),
      switchMap<true, Observable<number>>(
        (): Observable<number> => runInInjectionContext<Observable<number>>(
          this.injector,
          (): Observable<number> => toObservable<ElementRef<HTMLDivElement>>(this.backdropHtmlDivElementRef$).pipe<[ ElementRef<HTMLDivElement>, number | undefined, number | undefined, number | undefined, number | undefined ], number>(
            combineLatestWith<ElementRef<HTMLDivElement>, [ number | undefined, number | undefined, number | undefined, number | undefined ]>(
              toObservable<number | undefined>(this.viewportService.height$),
              toObservable<number | undefined>(this.viewportService.scrollTop$),
              toObservable<number | undefined>(this.bodyHeight$),
              toObservable<number | undefined>(this.height$),
            ),
            map<[ ElementRef<HTMLDivElement>, number | undefined, number | undefined, number | undefined, number | undefined ], number>(
              ([ backdropHtmlDivElementRef, viewportHeight ]: [ ElementRef<HTMLDivElement>, number | undefined, number | undefined, number | undefined, number | undefined ]): number => Math.round(
                Math.max(
                  backdropHtmlDivElementRef.nativeElement.getBoundingClientRect().bottom - (viewportHeight || 0) + Math.max(
                    0,
                    parseInt(backdropHtmlDivElementRef.nativeElement.computedStyleMap().get("margin-bottom")?.toString() || "0") + parseInt(backdropHtmlDivElementRef.nativeElement.computedStyleMap().get("--standard--root--safe-area-inset-bottom")?.toString() || "0"),
                  ),
                  0,
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly raisedWhenStuckOrUnsticking$: Signal<boolean | undefined>           = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<number | undefined>(this.unstickingTranslation$).pipe<boolean | undefined>(
      map<number | undefined, boolean | undefined>(
        (unstickingTranslation?: number): boolean | undefined => {
          if (unstickingTranslation !== undefined)
            return unstickingTranslation !== 0;
          else
            return undefined;
        },
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly raisedOrLoweringWhenStuckOrUnsticking$: Signal<boolean | undefined> = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.raisedWhenStuckOrUnsticking$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (raisedWhenStuckOrUnsticking?: boolean): Observable<number> => raisedWhenStuckOrUnsticking ? timer(0) : timer(360),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.raisedWhenStuckOrUnsticking$(),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly raisingScale$: Signal<number | undefined>                           = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<number | undefined>(this.width$).pipe<[ number | undefined, number | undefined ], number>(
      combineLatestWith<number | undefined, [ number | undefined ]>(
        toObservable<number | undefined>(this.viewportService.width$),
      ),
      map<[ number | undefined, number | undefined ], number>(
        ([ footerWidth, viewportWidth ]: [ number | undefined, number | undefined ]): number => ((viewportWidth || footerWidth || 0) - (footerWidth || 0)) / (viewportWidth || footerWidth || 1) / 2.6180339887,
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly roundedContainerDirective: RoundedDirective                         = inject<RoundedDirective>(RoundedDirective);
  protected readonly stuckOrUnsticking$: Signal<boolean | undefined>                     = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.stuckModelWithTransform$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (stuck?: boolean): Observable<number> => stuck ? timer(0) : timer(360),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.stuckModelWithTransform$(),
      ),
    ),
  ) : signal<undefined>(undefined);

  public readonly disclosureControlTemplateRef$: Signal<TemplateRef<never>>           = viewChild.required<TemplateRef<never>>("disclosureControlTemplate");
  public readonly stuckModel$: ModelSignal<"" | boolean | `${ boolean }` | undefined> = model<"" | boolean | `${ boolean }` | undefined>(
    false,
    {
      alias: "stuck",
    },
  );

}
