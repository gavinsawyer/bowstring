import { isPlatformBrowser, NgTemplateOutlet }                                                                                                                                          from "@angular/common";
import { Component, contentChildren, effect, type ElementRef, inject, input, type InputSignalWithTransform, numberAttribute, PLATFORM_ID, signal, type Signal, TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                       from "@angular/core/rxjs-interop";
import { ContainerDirective, FlexboxChildDirective, ScrollStackItemDirective }                                                                                                          from "@standard/directives";
import { filter, fromEvent, map, Observable, type Observer, startWith, switchMap, type TeardownLogic }                                                                                  from "rxjs";


@Component(
  {
    host:           {
      "[style.--standard--scroll-stack--minimum-aspect-ratio-input]": "minimumAspectRatioInput$()",
      "[style.--standard--scroll-stack--width]":                      "width$()",
      "[style.--standard--scroll-stack--scroll-left]":                "scrollLeft$()",
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

  constructor() {
    effect(
      (): void => this.containerDirective.htmlElementRef$.set(
        this.htmlDivElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly containerDirective: ContainerDirective                 = inject<ContainerDirective>(ContainerDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly platformId: NonNullable<unknown>                       = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly itemTemplateRefs$: Signal<readonly TemplateRef<ScrollStackItemDirective>[]> = contentChildren<ScrollStackItemDirective, TemplateRef<ScrollStackItemDirective>>(
    ScrollStackItemDirective,
    {
      read: TemplateRef,
    },
  );
  protected readonly scrollLeft$: Signal<number | undefined>                                     = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number | undefined, undefined>(
    toObservable<ElementRef<HTMLElement> | undefined>(
      this.htmlDivElementRef$,
    ).pipe<ElementRef<HTMLElement>, number>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<number>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<number> => fromEvent<Event>(
          htmlElementRef.nativeElement,
          "scroll",
        ).pipe<Event | null, number>(
          startWith<Event, [ null ]>(null),
          map<Event | null, number>(
            (): number => htmlElementRef.nativeElement.scrollLeft,
          ),
        ),
      ),
    ),
    {
      initialValue: undefined,
    },
  ) : signal<undefined>(undefined);
  protected readonly width$: Signal<number | undefined>                                          = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number | undefined, undefined>(
    toObservable<ElementRef<HTMLElement> | undefined>(
      this.htmlDivElementRef$,
    ).pipe<ElementRef<HTMLElement>, number>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<number>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<number> => new Observable<number>(
          (resizeEventObserver: Observer<number>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
            resizeObserver.observe(
              htmlElementRef.nativeElement,
            );

            return (): void => resizeObserver.disconnect();
          })(
            new ResizeObserver(
              (resizeObserverEntries: ResizeObserverEntry[]): void => resizeEventObserver.next(
                resizeObserverEntries[0].target.clientWidth,
              ),
            ),
          ),
        ),
      ),
    ),
    {
      initialValue: undefined,
    },
  ) : signal<undefined>(undefined);

  public readonly minimumAspectRatioInput$: InputSignalWithTransform<number, number | `${ number }`> = input.required<number, number | `${ number }`>(
    {
      alias:     "minimumAspectRatio",
      transform: numberAttribute,
    },
  );

}
