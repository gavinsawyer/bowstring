import { isPlatformBrowser }                                                                                                                                                                  from "@angular/common";
import { booleanAttribute, DestroyRef, Directive, effect, ElementRef, inject, input, InputSignal, InputSignalWithTransform, model, ModelSignal, PLATFORM_ID, Signal, signal, WritableSignal } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                                                         from "@angular/core/rxjs-interop";
import { BaselineAlignment, DistributedAlignment, FlexDirection, FlexPositionalAlignment, FlexWrap, Inherit, NormalAlignment, ScalarString }                                                  from "@standard/types";
import { combineLatestWith, delayWhen, filter, fromEvent, map, Observable, startWith, switchMap, timer }                                                                                      from "rxjs";
import { FlexboxContainerChildDirective }                                                                                                                                                     from "./FlexboxContainerChildDirective";


@Directive(
  {
    host:           {
      "[class.collapsable]":                                                    "collapsableInput$()",
      "[style.--standard--flexbox-container-directive--align-content-input]":   "alignContentInput$()",
      "[style.--standard--flexbox-container-directive--align-items-input]":     "alignItemsInput$()",
      "[style.--standard--flexbox-container-directive--column-gap-input]":      "columnGapInput$()",
      "[style.--standard--flexbox-container-directive--flex-direction-input]":  "flexDirectionInput$()",
      "[style.--standard--flexbox-container-directive--flex-wrap-input]":       "flexWrapInput$()",
      "[style.--standard--flexbox-container-directive--justify-content-input]": "justifyContentInput$()",
      "[style.--standard--flexbox-container-directive--row-gap-input]":         "rowGapInput$()",
      "[style.--standard--flexbox-container-directive--scroll-left-input]":     "scrollLeftModel$()",
      "[style.--standard--flexbox-container-directive--scroll-top-input]":      "scrollTopModel$()",
    },
    hostDirectives: [
      {
        directive: FlexboxContainerChildDirective,
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
    ) && toObservable<boolean | undefined>(
      this.listenToScrollEventInput$,
    ).pipe<[ boolean | undefined, ElementRef<HTMLElement> | undefined ], [ true, ElementRef<HTMLElement> ], { "left": number, "top": number }, { "left": number, "top": number }>(
      combineLatestWith<boolean | undefined, [ ElementRef<HTMLElement> | undefined ]>(
        toObservable<ElementRef<HTMLElement> | undefined>(
          this.htmlElementRef$,
        ),
      ),
      filter<[ boolean | undefined, ElementRef<HTMLElement> | undefined ], [ true, ElementRef<HTMLElement> ]>(
        (latest: [ boolean | undefined, ElementRef<HTMLElement> | undefined ]): latest is [ true, ElementRef<HTMLElement> ] => !!latest[0] && !!latest[1],
      ),
      switchMap<[ true, ElementRef<HTMLElement> ], Observable<{ "left": number, "top": number }>>(
        ([ , htmlElementRef ]: [ true, ElementRef<HTMLElement> ]): Observable<{ "left": number, "top": number }> => fromEvent<Event>(
          htmlElementRef.nativeElement,
          "scroll",
        ).pipe<Event | null, { "left": number, "top": number }>(
          startWith<Event, [ null ]>(null),
          map<Event | null, { "left": number, "top": number }>(
            (): { "left": number, "top": number } => ({
              left: htmlElementRef.nativeElement.scrollLeft,
              top:  htmlElementRef.nativeElement.scrollTop,
            }),
          ),
        ),
      ),
      takeUntilDestroyed<{ "left": number, "top": number }>(
        this.destroyRef,
      ),
    ).subscribe(
      (scrollPosition: { "left": number, "top": number }): void => {
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
      () => ((
        htmlElementRef?: ElementRef<HTMLElement>,
      ): void => htmlElementRef && ((
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

  private readonly destroyRef: DestroyRef           = inject<DestroyRef>(DestroyRef);
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
  public readonly collapsableInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                                             = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "collapsable",
      transform: booleanAttribute,
    },
  );
  public readonly expanded$: WritableSignal<boolean>                                                                                                          = signal<boolean>(false);
  public readonly expandedOrCollapsing$: Signal<boolean>                                                                                                      = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean, false>(
    toObservable<boolean>(
      this.expanded$,
    ).pipe<boolean>(
      delayWhen<boolean>(
        (expanded: boolean): Observable<number> => expanded ? timer(0) : timer(200),
      ),
    ),
    {
      initialValue: false,
    },
  ) : signal<boolean>(false);
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
