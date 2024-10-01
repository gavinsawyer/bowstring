import { isPlatformBrowser }                                                                                   from "@angular/common";
import { computed, Directive, type ElementRef, inject, PLATFORM_ID, type Signal, signal, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                              from "@angular/core/rxjs-interop";
import { PointerService }                                                                                      from "@standard/services";
import { combineLatestWith, delayWhen, filter, fromEvent, map, merge, type Observable, switchMap, timer }      from "rxjs";


@Directive(
  {
    host:       {
      "[class.focusedOrUnfocusing]":                                          "focusedOrUnfocusing$()",
      "[class.focused]":                                                      "focused$()",
      "[class.transformedOrUntransforming]":                                  "transformedOrUntransforming$()",
      "[class.transformed]":                                                  "transformed$()",
      "[style.--standard--hover-transforming-directive--last-translation-x]": "lastTranslationX$()",
      "[style.--standard--hover-transforming-directive--last-translation-y]": "lastTranslationY$()",
      "[style.--standard--hover-transforming-directive--translation-x]":      "translationX$()",
      "[style.--standard--hover-transforming-directive--translation-y]":      "translationY$()",
    },
    standalone: true,
  },
)
export class HoverTransformingDirective {

  private readonly platformId: NonNullable<unknown>                   = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly pointerService: PointerService                     = inject<PointerService>(PointerService);
  private readonly translation$: Signal<{ "x": number, "y": number }> = isPlatformBrowser(
    this.platformId,
  ) ? computed<{ "x": number, "y": number }>(
    (): { "x": number, "y": number } => ((domRect?: DOMRect): { "x": number, "y": number } => domRect && this.pointerService.position$().x >= domRect.left && this.pointerService.position$().x <= domRect.right && this.pointerService.position$().y >= domRect.top && this.pointerService.position$().y <= domRect.bottom ? {
      x: domRect ? ((2 * ((this.pointerService.position$().x - domRect.left) / domRect.width)) - 1) / 8 : 0,
      y: domRect ? ((2 * ((this.pointerService.position$().y - domRect.top) / domRect.height)) - 1) / 8 : 0,
    } : {
      x: 0,
      y: 0,
    })(
      this.htmlElementRef$()?.nativeElement.getBoundingClientRect(),
    ),
  ) : signal<{ "x": 0, "y": 0 }>(
    {
      x: 0,
      y: 0,
    },
  );

  public readonly htmlElementRef$: WritableSignal<ElementRef<HTMLElement> | undefined> = signal<undefined>(undefined);

  protected readonly focused$: Signal<boolean>                              = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean, false>(
    toObservable<ElementRef<HTMLElement> | undefined>(
      this.htmlElementRef$,
    ).pipe<ElementRef<HTMLElement>, boolean>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLDivElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<boolean>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<boolean> => merge<[ true, false ]>(
          fromEvent<FocusEvent>(
            htmlElementRef.nativeElement,
            "focusin",
          ).pipe<true>(
            map<FocusEvent, true>(
              (): true => true,
            ),
          ),
          fromEvent<FocusEvent>(
            htmlElementRef.nativeElement,
            "focusout",
          ).pipe<false>(
            map<FocusEvent, false>(
              (): false => false,
            ),
          ),
        ),
      ),
    ),
    {
      initialValue: false,
    },
  ) : signal<false>(false);
  protected readonly focusedOrUnfocusing$: Signal<boolean>                  = toSignal<boolean, false>(
    toObservable<boolean>(
      this.focused$,
    ).pipe<boolean, boolean>(
      delayWhen<boolean>(
        (focused: boolean): Observable<number> => focused ? timer(0) : timer(200),
      ),
      map<boolean, boolean>(
        (): boolean => this.focused$(),
      ),
    ),
    {
      initialValue: false,
    },
  );
  protected readonly lastTranslation$: Signal<{ "x": number, "y": number }> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<{ "x": number, "y": number }, { "x": 0, "y": 0 }>(
    toObservable<{ "x": number, "y": number }>(
      this.translation$,
    ).pipe<{ "x": number, "y": number }>(
      filter<{ "x": number, "y": number }>(
        (translation: { "x": number, "y": number }): boolean => !(translation.x === 0 && translation.y === 0),
      ),
    ),
    {
      initialValue: {
        x: 0,
        y: 0,
      },
    },
  ) : signal<{ "x": 0, "y": 0 }>(
    {
      x: 0,
      y: 0,
    },
  );
  protected readonly lastTranslationX$: Signal<number>                      = computed<number>(
    (): number => this.lastTranslation$().x,
  );
  protected readonly lastTranslationY$: Signal<number>                      = computed<number>(
    (): number => this.lastTranslation$().y,
  );
  protected readonly translationX$: Signal<number>                          = computed<number>(
    (): number => this.translation$().x,
  );
  protected readonly translationY$: Signal<number>                          = computed<number>(
    (): number => this.translation$().y,
  );
  protected readonly transformed$: Signal<boolean>                          = toSignal<boolean, false>(
    toObservable<number>(
      this.translationX$,
    ).pipe<[ number, number ], boolean>(
      combineLatestWith<number, [ number ]>(
        toObservable<number>(
          this.translationY$,
        ),
      ),
      map<[ number, number ], boolean>(
        ([ translationX, translationY ]: [ number, number ]): boolean => translationX !== 0 || translationY !== 0,
      ),
    ),
    {
      initialValue: false,
    },
  );
  protected readonly transformedOrUntransforming$: Signal<boolean>          = toSignal<boolean, false>(
    toObservable<boolean>(
      this.transformed$,
    ).pipe<boolean, boolean>(
      delayWhen<boolean>(
        (transformed: boolean): Observable<number> => transformed ? timer(0) : timer(200),
      ),
      map<boolean, boolean>(
        (): boolean => this.transformed$(),
      ),
    ),
    {
      initialValue: false,
    },
  );

}
