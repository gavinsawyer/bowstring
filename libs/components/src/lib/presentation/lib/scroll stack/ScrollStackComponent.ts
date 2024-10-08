import { isPlatformBrowser, NgTemplateOutlet }                                                                                                                                                                   from "@angular/common";
import { Component, contentChildren, type ElementRef, inject, Injector, input, type InputSignalWithTransform, numberAttribute, PLATFORM_ID, runInInjectionContext, signal, type Signal, TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                from "@angular/core/rxjs-interop";
import { ContainerDirective, FlexboxChildDirective, ScrollStackItemDirective }                                                                                                                                   from "@standard/directives";
import { ViewportService }                                                                                                                                                                                       from "@standard/services";
import { combineLatestWith, fromEvent, map, Observable, type Observer, startWith, switchMap, type TeardownLogic }                                                                                                from "rxjs";


@Component(
  {
    host:           {
      "[style.--standard--scroll-stack--minimum-aspect-ratio-input]": "minimumAspectRatioInput$()",
      "[style.--standard--scroll-stack--scroll-left]":                "scrollLeft$()",
      "[style.--standard--scroll-stack--viewport-vertical-offset]":   "viewportVerticalOffset$()",
      "[style.--standard--scroll-stack--width]":                      "width$()",
    },
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
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

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>      = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly innerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("innerHtmlDivElement");
  private readonly platformId: NonNullable<unknown>                            = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly injector: Injector                                          = inject<Injector>(Injector);

  protected readonly itemTemplateRefs$: Signal<readonly TemplateRef<ScrollStackItemDirective>[]> = contentChildren<ScrollStackItemDirective, TemplateRef<ScrollStackItemDirective>>(
    ScrollStackItemDirective,
    {
      read: TemplateRef,
    },
  );
  protected readonly scrollLeft$: Signal<number | undefined>                                     = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLDivElement>>(this.innerHtmlDivElementRef$).pipe<number>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        (innerHtmlDivElementRef: ElementRef<HTMLDivElement>): Observable<number> => fromEvent<Event>(
          innerHtmlDivElementRef.nativeElement,
          "scroll",
        ).pipe<Event | null, number>(
          startWith<Event, [ null ]>(null),
          map<Event | null, number>(
            (): number => innerHtmlDivElementRef.nativeElement.scrollLeft,
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly viewportService: ViewportService                                            = inject<ViewportService>(ViewportService);
  protected readonly viewportVerticalOffset$: Signal<number | undefined>                         = isPlatformBrowser(this.platformId) ? toSignal<number | undefined>(
    toObservable<ElementRef<HTMLDivElement>>(this.htmlDivElementRef$).pipe<number | undefined>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number | undefined>>(
        (htmlDivElementRef: ElementRef<HTMLDivElement>): Observable<number | undefined> => runInInjectionContext<Observable<number | undefined>>(
          this.injector,
          (): Observable<number | undefined> => toObservable<number | undefined>(this.viewportService.height$).pipe<[ number | undefined, number | undefined, number | undefined ], number | undefined>(
            combineLatestWith<number | undefined, [ number | undefined, number | undefined ]>(
              toObservable<number | undefined>(this.viewportService.width$),
              toObservable<number | undefined>(this.viewportService.scrollTop$),
            ),
            map<[ number | undefined, number | undefined, number | undefined ], number | undefined>(
              ([ viewportHeight ]: [ number | undefined, number | undefined, number | undefined ]): number | undefined => ((domRect?: DOMRect): number | undefined => {
                if (domRect !== undefined)
                  return domRect.top + domRect.height / 2 - (viewportHeight || 0) / 2;
                else
                  return undefined;
              })(htmlDivElementRef.nativeElement.getBoundingClientRect()),
            ),
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly width$: Signal<number | undefined>                                          = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLDivElement>>(this.htmlDivElementRef$).pipe<number>(
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        (htmlDivElementRef: ElementRef<HTMLDivElement>): Observable<number> => new Observable<number>(
          (resizeEventObserver: Observer<number>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
            resizeObserver.observe(htmlDivElementRef.nativeElement);

            return (): void => resizeObserver.disconnect();
          })(
            new ResizeObserver(
              (resizeObserverEntries: ResizeObserverEntry[]): void => resizeEventObserver.next(resizeObserverEntries[0].target.clientWidth),
            ),
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  public readonly minimumAspectRatioInput$: InputSignalWithTransform<number, number | `${ number }`> = input.required<number, number | `${ number }`>(
    {
      alias:     "minimumAspectRatio",
      transform: numberAttribute,
    },
  );

}
