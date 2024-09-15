import { isPlatformBrowser }                                                                                                                                        from "@angular/common";
import { computed, Directive, ElementRef, inject, Injector, input, InputSignalWithTransform, NgZone, numberAttribute, PLATFORM_ID, Signal, signal, WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                   from "@angular/core/rxjs-interop";
import { BRAND }                                                                                                                                                    from "@standard/injection-tokens";
import { Dimensions }                                                                                                                                               from "@standard/interfaces";
import { Brand }                                                                                                                                                    from "@standard/types";
import { filter, map, Observable, Observer, switchMap, TeardownLogic }                                                                                              from "rxjs";
import { v4 as uuid }                                                                                                                                               from "uuid";


@Directive(
  {
    host:       {
      "[style.--standard--rounded-container-directive--border-radius-factor-input]": "borderRadiusFactorInput$()",
      "[style.--standard--rounded-container-directive--brand-roundness]":            "brandRoundness$()",
      "[style.--standard--rounded-container-directive--clip-path-source]":           "clipPathSource$()",
    },
    standalone: true,
  },
)
export class RoundedContainerDirective {

  private readonly brand: Brand                     = inject<Brand>(BRAND);
  private readonly injector: Injector               = inject<Injector>(Injector);
  private readonly ngZone: NgZone                   = inject<NgZone>(NgZone);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly brandRoundness$: Signal<number>                                                     = signal<number>(this.brand.roundness);
  protected readonly clipPathSource$: Signal<`url(#standard--rounded-container--clip-path-${ string })`> = computed<`url(#standard--rounded-container--clip-path-${ string })`>(
    (): `url(#standard--rounded-container--clip-path-${ string })` => `url(#${ this.clipPathId$() })`,
  );

  public readonly htmlElementRef$: WritableSignal<ElementRef<HTMLElement> | undefined>                                                                                                                                         = signal<undefined>(undefined);
  public readonly borderRadiusFactorInput$: InputSignalWithTransform<number, number | `${ number }`>                                                                                                                           = input<number, number | `${ number }`>(
    1,
    {
      alias:     "borderRadiusFactor",
      transform: numberAttribute,
    },
  );
  public readonly clipPathId$: Signal<`standard--rounded-container--clip-path-${ string }`>                                                                                                                                    = signal<`standard--rounded-container--clip-path-${ string }`>(
    `standard--rounded-container--clip-path-${ uuid() }`,
  );
  public readonly pathDefinition$: Signal<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`, "M 0,0 L 1,0 C 1,0 1,0 1,0 L 1,0.5 C 1,1 1,1 1,1 L 0,1 C 0,1 0,1 0,0.5 L 0,0.5 C 0,0 0,0 0,0 Z">(
    toObservable<ElementRef<HTMLElement> | undefined>(
      this.htmlElementRef$,
      {
        injector: this.injector,
      },
    ).pipe<ElementRef<HTMLElement>, Dimensions, `M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<Dimensions>>(
        (htmlElementRef: ElementRef<HTMLElement>): Observable<Dimensions> => new Observable<Dimensions>(
          (resizeEventObserver: Observer<Dimensions>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
            resizeObserver.observe(
              htmlElementRef.nativeElement,
            );

            return (): void => resizeObserver.disconnect();
          })(
            new ResizeObserver(
              (resizeObserverEntries: ResizeObserverEntry[]): void => this.ngZone.run<void>(
                (): void => resizeEventObserver.next(
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
      map<Dimensions, `M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`>(
        (htmlElementDimensions: Dimensions): `M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z` => `M ${ this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.width || 1) },0 L ${ 1 - this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.width || 1) },0 C 1,0 1,0 1,${ this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.height || 1) } L 1,${ 1 - this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.height || 1) } C 1,1 1,1 ${ 1 - this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.width || 1) },1 L ${ this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.width || 1) },1 C 0,1 0,1 0,${ 1 - this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.height || 1) } L 0,${ this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.height || 1) } C 0,0 0,0 ${ this.borderRadiusFactorInput$() * this.brandRoundness$() * 29 / (htmlElementDimensions.width || 1) },0 Z`,
      ),
    ),
    {
      initialValue: "M 0,0 L 1,0 C 1,0 1,0 1,0 L 1,0.5 C 1,1 1,1 1,1 L 0,1 C 0,1 0,1 0,0.5 L 0,0.5 C 0,0 0,0 0,0 Z",
    },
  ) : signal<"M 0,0 L 1,0 C 1,0 1,0 1,0 L 1,0.5 C 1,1 1,1 1,1 L 0,1 C 0,1 0,1 0,0.5 L 0,0.5 C 0,0 0,0 0,0 Z">("M 0,0 L 1,0 C 1,0 1,0 1,0 L 1,0.5 C 1,1 1,1 1,1 L 0,1 C 0,1 0,1 0,0.5 L 0,0.5 C 0,0 0,0 0,0 Z");

}
