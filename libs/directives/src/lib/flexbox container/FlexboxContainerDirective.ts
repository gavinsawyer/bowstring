import { type ViewportScrollPosition }                                                                                                                                                                       from "@angular/cdk/scrolling";
import { isPlatformBrowser }                                                                                                                                                                                 from "@angular/common";
import { booleanAttribute, Directive, effect, type ElementRef, inject, Injector, input, type InputSignal, type InputSignalWithTransform, model, type ModelSignal, PLATFORM_ID, signal, type WritableSignal } from "@angular/core";
import { toObservable }                                                                                                                                                                                      from "@angular/core/rxjs-interop";
import { type BaselineAlignment, type DistributedAlignment, type FlexDirection, type FlexPositionalAlignment, type FlexWrap, type Inherit, type NormalAlignment, type ScalarString }                         from "@standard/types";
import { filter, fromEvent, map, type Observable, startWith, switchMap }                                                                                                                                     from "rxjs";
import { ContainerDirective }                                                                                                                                                                                from "../container/ContainerDirective";
import { FlexboxChildDirective }                                                                                                                                                                             from "../flexbox child/FlexboxChildDirective";


@Directive(
  {
    host:           {
      "[style.--standard--flexbox-container-directive--align-content-input]":   "alignContentInput$()",
      "[style.--standard--flexbox-container-directive--align-items-input]":     "alignItemsInput$()",
      "[style.--standard--flexbox-container-directive--column-gap-input]":      "columnGapInput$()",
      "[style.--standard--flexbox-container-directive--flex-direction-input]":  "flexDirectionInput$()",
      "[style.--standard--flexbox-container-directive--flex-wrap-input]":       "flexWrapInput$()",
      "[style.--standard--flexbox-container-directive--justify-content-input]": "justifyContentInput$()",
      "[style.--standard--flexbox-container-directive--row-gap-input]":         "rowGapInput$()",
      "[style.--standard--flexbox-container-directive--scroll-left]":           "scrollLeftModel$()",
      "[style.--standard--flexbox-container-directive--scroll-top]":            "scrollTopModel$()",
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
    standalone:     true,
  },
)
export class FlexboxContainerDirective {

  constructor() {
    isPlatformBrowser(
      this.platformId,
    ) && toObservable<ElementRef<HTMLElement> | undefined>(
      this.htmlElementRef$,
    ).pipe<ElementRef<HTMLElement>, ViewportScrollPosition>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef: ElementRef<HTMLElement> | undefined): htmlElementRef is ElementRef<HTMLElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<ViewportScrollPosition>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<ViewportScrollPosition> => toObservable<boolean>(
          this.listenToScrollEventInput$,
          {
            injector: this.injector,
          },
        ).pipe<true, ViewportScrollPosition>(
          filter<boolean, true>(
            (listenToScrollEventInput: boolean): listenToScrollEventInput is true => listenToScrollEventInput,
          ),
          switchMap<true, Observable<ViewportScrollPosition>>(
            (): Observable<ViewportScrollPosition> => fromEvent<Event>(
              htmlElementRef.nativeElement,
              "scroll",
            ).pipe<Event | null, ViewportScrollPosition>(
              startWith<Event, [ null ]>(null),
              map<Event | null, ViewportScrollPosition>(
                (): ViewportScrollPosition => ({
                  left: htmlElementRef.nativeElement.scrollLeft,
                  top:  htmlElementRef.nativeElement.scrollTop,
                }),
              ),
            ),
          ),
        ),
      ),
    ).subscribe(
      (scrollPosition: ViewportScrollPosition): void => {
        this.scrollLeftModel$.set(
          scrollPosition.left,
        );
        this.scrollTopModel$.set(
          scrollPosition.top,
        );
      },
    );

    isPlatformBrowser(
      this.platformId,
    ) && effect(
      (): void => ((htmlElementRef?: ElementRef<HTMLElement>): void => htmlElementRef && ((
        scrollLeft?: number,
        scrollTop?: number,
      ): void => {
        scrollLeft !== htmlElementRef.nativeElement.scrollLeft && htmlElementRef.nativeElement.scrollTo(
          scrollLeft || 0,
          htmlElementRef.nativeElement.scrollTop,
        );
        scrollTop !== htmlElementRef.nativeElement.scrollTop && htmlElementRef.nativeElement.scrollTo(
          htmlElementRef.nativeElement.scrollLeft,
          scrollTop || 0,
        );
      })(
        this.scrollLeftModel$(),
        this.scrollTopModel$(),
      ))(
        this.htmlElementRef$(),
      ),
    );
  }

  private readonly injector: Injector               = inject<Injector>(Injector);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly alignContentInput$: InputSignal<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined> = input<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>(
    undefined,
    {
      alias: "alignContent",
    },
  );
  public readonly alignItemsInput$: InputSignal<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>   = input<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>(
    undefined,
    {
      alias: "alignItems",
    },
  );
  public readonly columnGapInput$: InputSignal<ScalarString | Inherit | undefined>                                                                            = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "columnGap",
    },
  );
  public readonly flexDirectionInput$: InputSignal<FlexDirection | Inherit | undefined>                                                                       = input<FlexDirection | Inherit | undefined>(
    undefined,
    {
      alias: "flexDirection",
    },
  );
  public readonly flexWrapInput$: InputSignal<FlexWrap | Inherit | undefined>                                                                                 = input<FlexWrap | Inherit | undefined>(
    undefined,
    {
      alias: "flexWrap",
    },
  );
  public readonly htmlElementRef$: WritableSignal<ElementRef<HTMLElement> | undefined>                                                                        = signal<undefined>(undefined);
  public readonly justifyContentInput$: InputSignal<DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>                   = input<DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>(
    undefined,
    {
      alias: "justifyContent",
    },
  );
  public readonly rowGapInput$: InputSignal<ScalarString | Inherit | undefined>                                                                               = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "rowGap",
    },
  );
  public readonly scrollLeftModel$: ModelSignal<number | undefined>                                                                                           = model<number | undefined>(
    undefined,
    {
      alias: "scrollLeft",
    },
  );
  public readonly scrollTopModel$: ModelSignal<number | undefined>                                                                                            = model<number | undefined>(
    undefined,
    {
      alias: "scrollTop",
    },
  );
  public readonly listenToScrollEventInput$: InputSignalWithTransform<boolean, "" | boolean | `${ boolean }`>                                                 = input<boolean, "" | boolean | `${ boolean }`>(
    false,
    {
      alias:     "listenToScrollEvent",
      transform: booleanAttribute,
    },
  );

}
