import { FocusMonitor, type FocusOrigin }                                                                      from "@angular/cdk/a11y";
import { isPlatformBrowser }                                                                                   from "@angular/common";
import { computed, Directive, type ElementRef, inject, PLATFORM_ID, type Signal, signal, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                              from "@angular/core/rxjs-interop";
import { PointerService }                                                                                      from "@standard/services";
import { combineLatestWith, delayWhen, filter, map, type Observable, switchMap, timer }                        from "rxjs";


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

  private readonly focusMonitor: FocusMonitor                                     = inject<FocusMonitor>(FocusMonitor);
  private readonly platformId: NonNullable<unknown>                               = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly pointerService: PointerService                                 = inject<PointerService>(PointerService);
  private readonly translation$: Signal<{ "x": number, "y": number } | undefined> = computed<{ "x": number, "y": number } | undefined>(
    (): { "x": number, "y": number } | undefined => ((
      domRect?: DOMRect,
      pointerPosition?: { "x": number, "y": number },
    ): { "x": number, "y": number } | undefined => {
      if (domRect && pointerPosition && pointerPosition.x >= domRect.left && pointerPosition.x <= domRect.right && pointerPosition.y >= domRect.top && pointerPosition.y <= domRect.bottom)
        return {
          x: ((2 * ((pointerPosition.x - domRect.left) / domRect.width)) - 1) / 8,
          y: ((2 * ((pointerPosition.y - domRect.top) / domRect.height)) - 1) / 8,
        };
      else
        return undefined;
    })(
      this.htmlElementRef$()?.nativeElement.getBoundingClientRect(),
      this.pointerService.position$(),
    ),
  );

  public readonly htmlElementRef$: WritableSignal<ElementRef<HTMLElement> | undefined> = signal<undefined>(undefined);

  protected readonly focused$: Signal<boolean | undefined>                              = isPlatformBrowser(this.platformId) ? toSignal<boolean>(
    toObservable<ElementRef<HTMLElement> | undefined>(this.htmlElementRef$).pipe<ElementRef<HTMLElement>, boolean>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLDivElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<boolean>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<boolean> => this.focusMonitor.monitor(
          htmlElementRef.nativeElement,
          true,
        ).pipe<boolean>(
          map<FocusOrigin, boolean>(
            (focusOrigin: FocusOrigin): boolean => !!focusOrigin,
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly focusedOrUnfocusing$: Signal<boolean | undefined>                  = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.focused$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (focused?: boolean): Observable<number> => {
          if (focused !== undefined)
            return focused ? timer(0) : timer(200);
          else
            return timer(0);
        },
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.focused$(),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly lastTranslation$: Signal<{ "x": number, "y": number } | undefined> = isPlatformBrowser(this.platformId) ? toSignal<{ "x": number, "y": number }>(
    toObservable<{ "x": number, "y": number } | undefined>(
      this.translation$,
    ).pipe<{ "x": number, "y": number }>(
      filter<{ "x": number, "y": number } | undefined, { "x": number, "y": number }>(
        (translation?: { "x": number, "y": number }): translation is { "x": number, "y": number } => {
          if (translation !== undefined)
            return translation.x !== 0 || translation.y !== 0;
          else
            return false;
        },
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly lastTranslationX$: Signal<number | undefined>                      = computed<number | undefined>(
    (): number | undefined => this.lastTranslation$()?.x,
  );
  protected readonly lastTranslationY$: Signal<number | undefined>                      = computed<number | undefined>(
    (): number | undefined => this.lastTranslation$()?.y,
  );
  protected readonly translationX$: Signal<number | undefined>                          = computed<number | undefined>(
    (): number | undefined => this.translation$()?.x,
  );
  protected readonly translationY$: Signal<number | undefined>                          = computed<number | undefined>(
    (): number | undefined => this.translation$()?.y,
  );
  protected readonly transformed$: Signal<boolean | undefined>                          = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<number | undefined>(this.translationX$).pipe<[ number | undefined, number | undefined ], boolean | undefined>(
      combineLatestWith<number | undefined, [ number | undefined ]>(
        toObservable<number | undefined>(this.translationY$),
      ),
      map<[ number | undefined, number | undefined ], boolean | undefined>(
        ([ translationX, translationY ]: [ number | undefined, number | undefined ]): boolean | undefined => {
          if (translationX !== undefined || translationY !== undefined)
            return translationX !== 0 || translationY !== 0;
          else
            return undefined;
        },
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly transformedOrUntransforming$: Signal<boolean | undefined>          = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.transformed$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (transformed?: boolean): Observable<number> => transformed ? timer(0) : timer(200),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.transformed$(),
      ),
    ),
  ) : signal<undefined>(undefined);

}
