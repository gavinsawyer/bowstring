import { DOCUMENT, isPlatformBrowser, NgTemplateOutlet }                                                                                                                                            from "@angular/common";
import { Component, contentChildren, DestroyRef, effect, type ElementRef, inject, input, type InputSignalWithTransform, numberAttribute, PLATFORM_ID, signal, type Signal, TemplateRef, viewChild } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                                                               from "@angular/core/rxjs-interop";
import { ContainerDirective, FlexboxContainerChildDirective, ScrollStackItemDirective }                                                                                                             from "@standard/directives";
import { filter, fromEvent, map, type Observable, of, startWith, switchMap }                                                                                                                        from "rxjs";


@Component(
  {
    host:           {
      "[style.--standard--scroll-stack--minimum-aspect-ratio-input]": "minimumAspectRatioInput$()",
      "[style.--standard--scroll-stack--offset-width]":               "offsetWidth$()",
      "[style.--standard--scroll-stack--scroll-left]":                "scrollLeft$()",
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
  private readonly destroyRef: DestroyRef                                 = inject<DestroyRef>(DestroyRef);
  private readonly document: Document                                     = inject<Document>(DOCUMENT);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly platformId: NonNullable<unknown>                       = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly itemTemplateRefs$: Signal<ReadonlyArray<TemplateRef<ScrollStackItemDirective>>> = contentChildren<ScrollStackItemDirective, TemplateRef<ScrollStackItemDirective>>(
    ScrollStackItemDirective,
    {
      read: TemplateRef,
    },
  );
  protected readonly offsetWidth$: Signal<number | undefined>                                        = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number | undefined, undefined>(
    toObservable<ElementRef<HTMLElement> | undefined>(
      this.htmlDivElementRef$,
    ).pipe<ElementRef<HTMLElement>, number | undefined>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<number | undefined>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<number | undefined> => this.document.defaultView ? fromEvent<Event>(
          this.document.defaultView,
          "resize",
        ).pipe<Event | null, number, number>(
          startWith<Event, [ null ]>(null),
          map<Event | null, number>(
            (): number => htmlElementRef.nativeElement.offsetWidth,
          ),
          takeUntilDestroyed<number>(
            this.destroyRef,
          ),
        ) : of<undefined>(undefined),
      ),
    ),
    {
      initialValue: undefined,
    },
  ) : signal<undefined>(undefined);
  protected readonly scrollLeft$: Signal<number | undefined>                                         = isPlatformBrowser(
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
        ).pipe<Event | null, number, number>(
          startWith<Event, [ null ]>(null),
          map<Event | null, number>(
            (): number => htmlElementRef.nativeElement.scrollLeft,
          ),
          takeUntilDestroyed<number>(
            this.destroyRef,
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
