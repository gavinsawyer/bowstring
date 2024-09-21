import { isPlatformBrowser, NgTemplateOutlet }                                                                                                                                                                             from "@angular/common";
import { Component, computed, contentChildren, type ElementRef, inject, Injector, input, type InputSignalWithTransform, numberAttribute, PLATFORM_ID, runInInjectionContext, signal, type Signal, TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                          from "@angular/core/rxjs-interop";
import { ContainerDirective, FlexboxChildDirective, ScrollStackItemDirective }                                                                                                                                             from "@standard/directives";
import { type Dimensions }                                                                                                                                                                                                 from "@standard/interfaces";
import { ViewportService }                                                                                                                                                                                                 from "@standard/services";
import { combineLatestWith, filter, fromEvent, map, Observable, type Observer, startWith, switchMap, type TeardownLogic }                                                                                                  from "rxjs";


@Component(
  {
    host:           {
      "[style.--standard--scroll-stack--height]":                     "height$()",
      "[style.--standard--scroll-stack--minimum-aspect-ratio-input]": "minimumAspectRatioInput$()",
      "[style.--standard--scroll-stack--width]":                      "width$()",
      "[style.--standard--scroll-stack--scroll-left]":                "scrollLeft$()",
      "[style.--standard--scroll-stack--viewport-vertical-offset]":   "viewportVerticalOffset$()",
    },
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "aspectRatio",
          "alignSelf",
          "bottomPosition",
          "hideScrollbar",
          "leftPosition",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "rightPosition",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
          "topPosition",
        ],
      },
      {
        directive: FlexboxChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--scroll-stack",
    standalone:     true,
    styleUrls:      [
      "ScrollStackComponent.sass",
    ],
    templateUrl:    "ScrollStackComponent.html",
  },
)
export class ScrollStackComponent {

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly platformId: NonNullable<unknown>                       = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly dimensions$: Signal<Dimensions>                        = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<Dimensions, { "height": 0, "width": 0 }>(
    toObservable<ElementRef<HTMLDivElement>>(
      this.htmlDivElementRef$,
    ).pipe<Dimensions>(
      switchMap<ElementRef<HTMLDivElement>, Observable<Dimensions>>(
        (htmlElementRef: ElementRef<HTMLDivElement>): Observable<Dimensions> => new Observable<Dimensions>(
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
  private readonly injector: Injector                                     = inject<Injector>(Injector);

  protected readonly height$: Signal<number>                                                     = computed<number>(
    (): number => this.dimensions$().height,
  );
  protected readonly itemTemplateRefs$: Signal<readonly TemplateRef<ScrollStackItemDirective>[]> = contentChildren<ScrollStackItemDirective, TemplateRef<ScrollStackItemDirective>>(
    ScrollStackItemDirective,
    {
      read: TemplateRef,
    },
  );
  protected readonly scrollLeft$: Signal<number | undefined>                                     = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number | undefined, undefined>(
    toObservable<ElementRef<HTMLDivElement> | undefined>(
      this.htmlDivElementRef$,
    ).pipe<ElementRef<HTMLDivElement>, number>(
      filter<ElementRef<HTMLDivElement> | undefined, ElementRef<HTMLDivElement>>(
        (htmlDivElementRef?: ElementRef<HTMLDivElement>): htmlDivElementRef is ElementRef<HTMLDivElement> => !!htmlDivElementRef,
      ),
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        (htmlDivElementRef: ElementRef<HTMLDivElement>): Observable<number> => fromEvent<Event>(
          htmlDivElementRef.nativeElement,
          "scroll",
        ).pipe<Event | null, number>(
          startWith<Event, [ null ]>(null),
          map<Event | null, number>(
            (): number => htmlDivElementRef.nativeElement.scrollLeft,
          ),
        ),
      ),
    ),
    {
      initialValue: undefined,
    },
  ) : signal<undefined>(undefined);
  protected readonly viewportService: ViewportService                                            = inject<ViewportService>(ViewportService);
  protected readonly viewportVerticalOffset$: Signal<number>                                     = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number, 0>(
    toObservable<ElementRef<HTMLDivElement>>(
      this.htmlDivElementRef$,
    ).pipe<number>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        (htmlDivElementRef: ElementRef<HTMLDivElement>): Observable<number> => runInInjectionContext<Observable<number>>(
          this.injector,
          (): Observable<number> => toObservable<number | undefined>(
            this.viewportService.height$,
          ).pipe<[ number | undefined, number | undefined ], number>(
            combineLatestWith<number | undefined, [ number | undefined ]>(
              toObservable<number | undefined>(
                this.viewportService.scrollTop$,
              ),
            ),
            map<[ number | undefined, number | undefined ], number>(
              ([ viewportHeight ]: [ number | undefined, number | undefined ]): number => ((domRect?: DOMRect): number => domRect ? domRect.top + domRect.height / 2 - (viewportHeight || 0) / 2 : 0)(
                htmlDivElementRef.nativeElement.getBoundingClientRect(),
              ) * (viewportHeight || 1),
            ),
          ),
        ),
      ),
    ),
    {
      initialValue: 0,
    },
  ) : signal<0>(0);
  protected readonly width$: Signal<number>                                                      = computed<number>(
    (): number => this.dimensions$().width,
  );

  public readonly minimumAspectRatioInput$: InputSignalWithTransform<number, number | `${ number }`> = input.required<number, number | `${ number }`>(
    {
      alias:     "minimumAspectRatio",
      transform: numberAttribute,
    },
  );

}
