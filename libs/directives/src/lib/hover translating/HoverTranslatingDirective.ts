import { isPlatformBrowser }                                                                                             from "@angular/common";
import { computed, Directive, type ElementRef, inject, Injector, PLATFORM_ID, type Signal, signal, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                                        from "@angular/core/rxjs-interop";
import { PointerService }                                                                                                from "@standard/services";
import { delayWhen, filter, map, type Observable, switchMap, timer }                                                     from "rxjs";


@Directive(
  {
    host:       {
      "[style.--standard--hover-translating-directive--translation-transition-duration]": "translationTransitionDuration$()",
      "[style.--standard--hover-translating-directive--translation-x]":                   "translationX$()",
      "[style.--standard--hover-translating-directive--translation-y]":                   "translationY$()",
    },
    standalone: true,
  },
)
export class HoverTranslatingDirective {

  private readonly injector: Injector                                 = inject<Injector>(Injector);
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

  protected readonly translationTransitionDuration$: Signal<200 | 0> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<200 | 0, 200>(
    toObservable<ElementRef<HTMLElement> | undefined>(
      this.htmlElementRef$,
    ).pipe<ElementRef<HTMLElement>, 200 | 0>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<200 | 0>>(
        (): Observable<200 | 0> => toObservable<boolean | undefined>(
          computed<boolean | undefined>(
            (): boolean | undefined => ((domRect?: DOMRect): boolean => domRect ? this.pointerService.position$().x >= domRect.left && this.pointerService.position$().x <= domRect.right && this.pointerService.position$().y >= domRect.top && this.pointerService.position$().y <= domRect.bottom : false)(
              this.htmlElementRef$()?.nativeElement.getBoundingClientRect(),
            ),
          ),
          {
            injector: this.injector,
          },
        ).pipe<boolean | undefined, 200 | 0>(
          delayWhen<boolean | undefined>(
            (pointerInHtmlElementBoundingClientRect: boolean | undefined): Observable<number> => pointerInHtmlElementBoundingClientRect ? timer(200) : timer(0),
          ),
          map<boolean | undefined, 200 | 0>(
            (pointerInHtmlElementBoundingClientRect: boolean | undefined): 200 | 0 => pointerInHtmlElementBoundingClientRect ? 0 : 200,
          ),
        ),
      ),
    ),
    {
      initialValue: 200,
    },
  ) : signal<200>(200);
  protected readonly translationX$: Signal<number>                   = computed<number>(
    (): number => this.translation$().x,
  );
  protected readonly translationY$: Signal<number>                   = computed<number>(
    (): number => this.translation$().y,
  );

}
