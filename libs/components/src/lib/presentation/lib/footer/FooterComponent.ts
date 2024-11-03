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
      "[class.pinnedOrUnpinning]":                         "pinnedOrUnpinning$()",
      "[class.pinned]":                                    "pinnedModelWithTransform$()",
      "[class.raisedOrLoweringWhenPinnedOrUnpinning]":     "raisedOrLoweringWhenPinnedOrUnpinning$()",
      "[class.raisedWhenPinnedOrUnpinning]":               "raisedWhenPinnedOrUnpinning$()",
      "[style.--standard--footer--height]":                "height$()",
      "[style.--standard--footer--raising-scale]":         "raisingScale$()",
      "[style.--standard--footer--unpinning-translation]": "unpinningTranslation$()",
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
      (): void => this.roundedDirective.htmlElementRef$.set(this.htmlElementRef$()),
    );
  }

  private readonly backdropHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("backdropHtmlDivElement");
  private readonly document: Document                                             = inject<Document>(DOCUMENT);
  private readonly platformId: NonNullable<unknown>                               = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly bodyHeight$: Signal<number | undefined>                        = isPlatformBrowser(this.platformId) ? toSignal<number>(
    new Observable<number>(
      (resizeEventObserver: Observer<number>): TeardownLogic => {
        const resizeObserver: ResizeObserver = new ResizeObserver(
          ([ { target: { clientHeight } } ]: ResizeObserverEntry[]): void => resizeEventObserver.next(clientHeight),
        );

        resizeObserver.observe(this.document.body);

        return (): void => resizeObserver.disconnect();
      },
    ),
  ) : signal<undefined>(undefined);
  private readonly htmlElementRef$: Signal<ElementRef<HTMLElement>>               = viewChild.required<ElementRef<HTMLElement>>("htmlElement");
  private readonly dimensions$: Signal<Dimensions | undefined>                    = isPlatformBrowser(this.platformId) ? toSignal<Dimensions>(
    toObservable<ElementRef<HTMLElement>>(this.htmlElementRef$).pipe<Dimensions>(
      switchMap<ElementRef<HTMLElement>, Observable<Dimensions>>(
        ({ nativeElement: htmlElement }: ElementRef<HTMLElement>): Observable<Dimensions> => new Observable<Dimensions>(
          (resizeEventObserver: Observer<Dimensions>): TeardownLogic => {
            const resizeObserver: ResizeObserver = new ResizeObserver(
              ([ { target: element } ]: ResizeObserverEntry[]): void => resizeEventObserver.next(
                {
                  height: element.clientHeight,
                  width:  element.clientWidth,
                },
              ),
            );

            resizeObserver.observe(htmlElement);

            return (): void => resizeObserver.disconnect();
          },
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  private readonly injector: Injector                                             = inject<Injector>(Injector);
  private readonly viewportService: ViewportService                               = inject<ViewportService>(ViewportService);
  private readonly width$: Signal<number | undefined>                             = computed<number | undefined>(
    (): number | undefined => this.dimensions$()?.width,
  );

  protected readonly height$: Signal<number | undefined>                       = computed<number | undefined>(
    (): number | undefined => this.dimensions$()?.height,
  );
  protected readonly pinFillSymbolPaths$: Signal<SymbolPaths | undefined>      = toSignal<SymbolPaths>(
    fromPromise<SymbolPaths>(
      loadSymbolPaths("PinFill"),
    ),
  );
  protected readonly pinSlashFillSymbolPaths$: Signal<SymbolPaths | undefined> = toSignal<SymbolPaths>(
    fromPromise<SymbolPaths>(
      loadSymbolPaths("PinSlashFill"),
    ),
  );

  public readonly pinnedModelWithTransform$: Signal<boolean | undefined> = computed<boolean | undefined>(
    (): boolean | undefined => {
      const pinned: "" | boolean | `${ boolean }` | undefined = this.pinnedModel$();

      if (pinned === undefined)
        return undefined;

      return pinned === "" || pinned === true || pinned === "true" || pinned !== "false" && false;
    },
  );

  protected readonly pinnedOrUnpinning$: Signal<boolean | undefined>                     = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.pinnedModelWithTransform$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (pinned?: boolean): Observable<number> => pinned ? timer(0) : timer(360),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.pinnedModelWithTransform$(),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly unpinningTranslation$: Signal<number | undefined>                   = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<boolean | undefined>(this.pinnedModelWithTransform$).pipe<true, number>(
      filter<boolean | undefined, true>(
        (pinned?: boolean): pinned is true => pinned === true,
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
              ([ { nativeElement: backdropHtmlDivElement }, viewportHeight ]: [ ElementRef<HTMLDivElement>, number | undefined, number | undefined, number | undefined, number | undefined ]): number => Math.round(
                Math.max(
                  backdropHtmlDivElement.getBoundingClientRect().bottom - (viewportHeight || 0) + Math.max(
                    0,
                    parseInt(backdropHtmlDivElement.computedStyleMap().get("margin-bottom")?.toString() || "0") + parseInt(backdropHtmlDivElement.computedStyleMap().get("--standard--root--safe-area-inset-bottom")?.toString() || "0"),
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
  protected readonly raisedWhenPinnedOrUnpinning$: Signal<boolean | undefined>           = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<number | undefined>(this.unpinningTranslation$).pipe<boolean | undefined>(
      map<number | undefined, boolean | undefined>(
        (unpinningTranslation?: number): boolean | undefined => {
          if (unpinningTranslation === undefined)
            return undefined;

          return unpinningTranslation !== 0;
        },
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly raisedOrLoweringWhenPinnedOrUnpinning$: Signal<boolean | undefined> = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.raisedWhenPinnedOrUnpinning$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (raisedWhenPinnedOrUnpinning?: boolean): Observable<number> => raisedWhenPinnedOrUnpinning ? timer(0) : timer(360),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.raisedWhenPinnedOrUnpinning$(),
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
  protected readonly roundedDirective: RoundedDirective                                  = inject<RoundedDirective>(RoundedDirective);

  public readonly pinnedControlTemplateRef$: Signal<TemplateRef<never>>                = viewChild.required<TemplateRef<never>>("pinnedControlTemplate");
  public readonly pinnedModel$: ModelSignal<"" | boolean | `${ boolean }` | undefined> = model<"" | boolean | `${ boolean }` | undefined>(
    false,
    {
      alias: "pinned",
    },
  );

}
