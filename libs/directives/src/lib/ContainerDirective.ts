import { DOCUMENT, isPlatformBrowser }                                                                                                                                                       from "@angular/common";
import { booleanAttribute, computed, DestroyRef, Directive, ElementRef, inject, input, InputSignal, InputSignalWithTransform, numberAttribute, PLATFORM_ID, Signal, signal, WritableSignal } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                                                        from "@angular/core/rxjs-interop";
import { BaselineAlignment, DistributedAlignment, FlexPositionalAlignment, Inherit, NormalAlignment, Overflow, Position, ScalarString, ScrollSnapAlign, ScrollSnapStop, ScrollSnapType }     from "@standard/types";
import { combineLatestWith, filter, fromEvent, map, Observable, of, startWith, switchMap }                                                                                                   from "rxjs";


@Directive(
  {
    host:       {
      "[class.hideScrollbar]":                                            "hideScrollbarInput$()",
      "[style.--standard--container-directive--align-self-input]":        "alignSelfInput$()",
      "[style.--standard--container-directive--aspect-ratio-input]":      "aspectRatioInput$()",
      "[style.--standard--container-directive--bottom-position-input]":   "bottomPositionInput$()",
      "[style.--standard--container-directive--left-position-input]":     "leftPositionInput$()",
      "[style.--standard--container-directive--margin-bottom-input]":     "marginBottomInput$()",
      "[style.--standard--container-directive--margin-sides-input]":      "marginSidesInput$()",
      "[style.--standard--container-directive--margin-top-input]":        "marginTopInput$()",
      "[style.--standard--container-directive--offset-height]":           "offsetHeight$()",
      "[style.--standard--container-directive--offset-width]":            "offsetWidth$()",
      "[style.--standard--container-directive--overflow-x-input]":        "overflowXInput$()",
      "[style.--standard--container-directive--overflow-y-input]":        "overflowYInput$()",
      "[style.--standard--container-directive--padding-bottom-input]":    "paddingBottomInput$()",
      "[style.--standard--container-directive--padding-sides-input]":     "paddingSidesInput$()",
      "[style.--standard--container-directive--padding-top-input]":       "paddingTopInput$()",
      "[style.--standard--container-directive--position-input]":          "positionInput$()",
      "[style.--standard--container-directive--right-position-input]":    "rightPositionInput$()",
      "[style.--standard--container-directive--scroll-snap-align-input]": "scrollSnapAlignInput$()",
      "[style.--standard--container-directive--scroll-snap-stop-input]":  "scrollSnapStopInput$()",
      "[style.--standard--container-directive--scroll-snap-type-input]":  "scrollSnapTypeInput$()",
      "[style.--standard--container-directive--top-position-input]":      "topPositionInput$()",
    },
    standalone: true,
  },
)
export class ContainerDirective {

  private readonly destroyRef: DestroyRef           = inject<DestroyRef>(DestroyRef);
  private readonly document: Document               = inject<Document>(DOCUMENT);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly htmlElementRef$: WritableSignal<ElementRef<HTMLElement> | undefined>                                    = signal<ElementRef<HTMLElement> | undefined>(undefined);
  public readonly listenToResizeEventInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`> = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "listenToResizeEvent",
      transform: booleanAttribute,
    },
  );

  private readonly offsetDimensions$: Signal<{ "height": number, "width": number } | undefined> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<{ "height": number, "width": number } | undefined, undefined>(
    toObservable<boolean | undefined>(
      this.listenToResizeEventInput$,
    ).pipe<[ boolean | undefined, ElementRef<HTMLElement> | undefined ], [ true, ElementRef<HTMLElement> ], { "height": number, "width": number }>(
      combineLatestWith<boolean | undefined, [ ElementRef<HTMLElement> | undefined ]>(
        toObservable<ElementRef<HTMLElement> | undefined>(
          this.htmlElementRef$,
        ),
      ),
      filter<[ boolean | undefined, ElementRef<HTMLElement> | undefined ], [ true, ElementRef<HTMLElement> ]>(
        (latest: [ boolean | undefined, ElementRef<HTMLElement> | undefined ]): latest is [ true, ElementRef<HTMLElement> ] => !!latest[0] && !!latest[1],
      ),
      switchMap<[ true, ElementRef<HTMLElement> ], Observable<{ "height": number, "width": number }>>(
        ([ , htmlElementRef ]: [ true, ElementRef<HTMLElement> ]): Observable<{ "height": number, "width": number }> => this.document.defaultView ? fromEvent<Event>(
          this.document.defaultView,
          "resize",
        ).pipe<Event | null, { "height": number, "width": number }, { "height": number, "width": number }>(
          startWith<Event, [ null ]>(null),
          map<Event | null, { "height": number, "width": number }>(
            (): { "height": number, "width": number } => ({
              height: htmlElementRef.nativeElement.offsetHeight,
              width:  htmlElementRef.nativeElement.offsetWidth,
            }),
          ),
          takeUntilDestroyed<{ "height": number, "width": number }>(
            this.destroyRef,
          ),
        ) : of<{ "height": number, "width": number }>(
          {
            height: 0,
            width:  0,
          },
        ),
      ),
    ),
    {
      initialValue: undefined,
    },
  ) : signal<undefined>(undefined);

  public readonly alignSelfInput$: InputSignal<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined> = input<BaselineAlignment | DistributedAlignment | NormalAlignment | FlexPositionalAlignment | Inherit | undefined>(
    undefined,
    {
      alias: "alignSelf",
    },
  );
  public readonly aspectRatioInput$: InputSignalWithTransform<number | undefined, number | `${ number }`>                                                  = input<number | undefined, number | `${ number }`>(
    undefined,
    {
      alias:     "aspectRatio",
      transform: numberAttribute,
    },
  );
  public readonly bottomPositionInput$: InputSignal<ScalarString | Inherit | undefined>                                                                    = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "bottomPosition",
    },
  );
  public readonly hideScrollbarInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                                        = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "hideScrollbar",
      transform: booleanAttribute,
    },
  );
  public readonly leftPositionInput$: InputSignal<ScalarString | Inherit | undefined>                                                                      = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "leftPosition",
    },
  );
  public readonly marginBottomInput$: InputSignal<ScalarString | Inherit | undefined>                                                                      = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "marginBottom",
    },
  );
  public readonly marginSidesInput$: InputSignal<ScalarString | Inherit | undefined>                                                                       = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "marginSides",
    },
  );
  public readonly marginTopInput$: InputSignal<ScalarString | Inherit | undefined>                                                                         = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "marginTop",
    },
  );
  public readonly offsetHeight$: Signal<number | undefined>                                                                                                = computed<number | undefined>(
    (): number | undefined => this.offsetDimensions$()?.height,
  );
  public readonly offsetWidth$: Signal<number | undefined>                                                                                                 = computed<number | undefined>(
    (): number | undefined => this.offsetDimensions$()?.width,
  );
  public readonly overflowXInput$: InputSignal<Overflow | Inherit | undefined>                                                                             = input<Overflow | Inherit | undefined>(
    undefined,
    {
      alias: "overflowX",
    },
  );
  public readonly overflowYInput$: InputSignal<Overflow | Inherit | undefined>                                                                             = input<Overflow | Inherit | undefined>(
    undefined,
    {
      alias: "overflowY",
    },
  );
  public readonly paddingBottomInput$: InputSignal<ScalarString | Inherit | undefined>                                                                     = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "paddingBottom",
    },
  );
  public readonly paddingSidesInput$: InputSignal<ScalarString | Inherit | undefined>                                                                      = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "paddingSides",
    },
  );
  public readonly paddingTopInput$: InputSignal<ScalarString | Inherit | undefined>                                                                        = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "paddingTop",
    },
  );
  public readonly positionInput$: InputSignal<Position | Inherit | undefined>                                                                              = input<Position | Inherit | undefined>(
    undefined,
    {
      alias: "position",
    },
  );
  public readonly rightPositionInput$: InputSignal<ScalarString | Inherit | undefined>                                                                     = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "rightPosition",
    },
  );
  public readonly scrollSnapAlignInput$: InputSignal<ScrollSnapAlign | Inherit | undefined>                                                                = input<ScrollSnapAlign | Inherit | undefined>(
    undefined,
    {
      alias: "scrollSnapAlign",
    },
  );
  public readonly scrollSnapStopInput$: InputSignal<ScrollSnapStop | Inherit | undefined>                                                                  = input<ScrollSnapStop | Inherit | undefined>(
    undefined,
    {
      alias: "scrollSnapStop",
    },
  );
  public readonly scrollSnapTypeInput$: InputSignal<ScrollSnapType | Inherit | undefined>                                                                  = input<ScrollSnapType | Inherit | undefined>(
    undefined,
    {
      alias: "scrollSnapType",
    },
  );
  public readonly topPositionInput$: InputSignal<ScalarString | Inherit | undefined>                                                                       = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "topPosition",
    },
  );

}
