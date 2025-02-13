import { isPlatformBrowser }                                                                                                                                          from "@angular/common";
import { computed, Directive, type ElementRef, inject, input, type InputSignalWithTransform, numberAttribute, PLATFORM_ID, type Signal, signal, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                     from "@angular/core/rxjs-interop";
import { BRAND }                                                                                                                                                      from "@bowstring/injection-tokens";
import { type Brand }                                                                                                                                                 from "@bowstring/types";
import { filter, Observable, type Observer, startWith, switchMap, type TeardownLogic }                                                                                from "rxjs";
import { v7 as uuidV7 }                                                                                                                                               from "uuid";


@Directive(
  {
    exportAs: "wellRoundedDirective",
    host:     {
      "[style.--bowstring--well-rounded-directive--brand-roundness]":  "brandRoundness$()",
      "[style.--bowstring--well-rounded-directive--clip-path-source]": "clipPathSource$()",
      "[style.--bowstring--well-rounded-directive--level-input]":      "levelInput$()",
    },
    selector: "[bowstringWellRoundedDirective]",

    standalone: true,
  },
)
export class WellRoundedDirective {

  private readonly brand: Brand                     = inject<Brand>(BRAND);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly brandRoundness$: WritableSignal<number>                                                  = signal<number>(this.brand.roundness);
  protected readonly clipPathSource$: Signal<`url(#bowstring--well-rounded-directive--clip-path-${ string })`> = computed<`url(#bowstring--well-rounded-directive--clip-path-${ string })`>(
    (): `url(#bowstring--well-rounded-directive--clip-path-${ string })` => `url(#${ this.clipPathId$() })`,
  );

  public readonly htmlElementRef$: WritableSignal<ElementRef<HTMLElement> | undefined>                                                                                                                                         = signal<undefined>(undefined);
  public readonly levelInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`>                                                                                                                       = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "level",
      transform: numberAttribute,
    },
  );
  public readonly clipPathId$: Signal<`bowstring--well-rounded-directive--clip-path-${ string }`>                                                                                                                               = signal<`bowstring--well-rounded-directive--clip-path-${ string }`>(`bowstring--well-rounded-directive--clip-path-${ uuidV7() }`);
  public readonly pathDefinition$: Signal<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`> = isPlatformBrowser(this.platformId) ? toSignal<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`>(
    toObservable<ElementRef<HTMLElement> | undefined>(this.htmlElementRef$).pipe<ElementRef<HTMLElement>, `M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`, `M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`>(
      filter<ElementRef<HTMLElement> | undefined, ElementRef<HTMLElement>>(
        (htmlElementRef?: ElementRef<HTMLElement>): htmlElementRef is ElementRef<HTMLElement> => !!htmlElementRef,
      ),
      switchMap<ElementRef<HTMLElement>, Observable<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`>>(
        ({ nativeElement: htmlElement }: ElementRef<HTMLElement>): Observable<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`> => new Observable<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`>(
          (pathDefinitionObserver: Observer<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`>): TeardownLogic => {
            const resizeObserver: ResizeObserver = new ResizeObserver(
              ([ { target: element } ]: ResizeObserverEntry[]): void => {
                const positionDividend: number = this.brand.roundness * 36 / (this.levelInput$() || 1);

                pathDefinitionObserver.next(`M ${ positionDividend / (element.clientWidth || 1) },0 L ${ 1 - positionDividend / (element.clientWidth || 1) },0 C 1,0 1,0 1,${ positionDividend / (element.clientHeight || 1) } L 1,${ 1 - positionDividend / (element.clientHeight || 1) } C 1,1 1,1 ${ 1 - positionDividend / (element.clientWidth || 1) },1 L ${ positionDividend / (element.clientWidth || 1) },1 C 0,1 0,1 0,${ 1 - positionDividend / (element.clientHeight || 1) } L 0,${ positionDividend / (element.clientHeight || 1) } C 0,0 0,0 ${ positionDividend / (element.clientWidth || 1) },0 Z`);
              },
            );

            resizeObserver.observe(htmlElement);

            return (): void => resizeObserver.disconnect();
          },
        ),
      ),
      startWith<`M ${ number },0 L ${ number },0 C 1,0 1,0 1,${ number } L 1,${ number } C 1,1 1,1 ${ number },1 L ${ number },1 C 0,1 0,1 0,${ number } L 0,${ number } C 0,0 0,0 ${ number },0 Z`, [ "M 0,0 L 1,0 C 1,0 1,0 1,0 L 1,0.5 C 1,1 1,1 1,1 L 0,1 C 0,1 0,1 0,0.5 L 0,0.5 C 0,0 0,0 0,0 Z" ]>("M 0,0 L 1,0 C 1,0 1,0 1,0 L 1,0.5 C 1,1 1,1 1,1 L 0,1 C 0,1 0,1 0,0.5 L 0,0.5 C 0,0 0,0 0,0 Z"),
    ),
    {
      requireSync: true,
    },
  ) : signal<"M 0,0 L 1,0 C 1,0 1,0 1,0 L 1,0.5 C 1,1 1,1 1,1 L 0,1 C 0,1 0,1 0,0.5 L 0,0.5 C 0,0 0,0 0,0 Z">("M 0,0 L 1,0 C 1,0 1,0 1,0 L 1,0.5 C 1,1 1,1 1,1 L 0,1 C 0,1 0,1 0,0.5 L 0,0.5 C 0,0 0,0 0,0 Z");

}
