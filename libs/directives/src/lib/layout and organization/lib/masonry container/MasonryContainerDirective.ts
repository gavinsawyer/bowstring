import { isPlatformBrowser }                                                                                                                                                               from "@angular/common";
import { afterRender, Directive, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, PLATFORM_ID, signal, type Signal, type WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                          from "@angular/core/rxjs-interop";
import { type Inherit, type ScalarString }                                                                                                                                                 from "@standard/types";
import type Masonry                                                                                                                                                                        from "masonry-layout";
import { filter, Observable, type Observer, switchMap, type TeardownLogic }                                                                                                                from "rxjs";
import { ContainerDirective }                                                                                                                                                              from "../container/ContainerDirective";


@Directive(
  {
    host:           {
      "[style.--standard--masonry-container-directive--column-width]":     "columnWidth$()",
      "[style.--standard--masonry-container-directive--columns-input]":    "columnsInput$()",
      "[style.--standard--masonry-container-directive--gap-column-input]": "gapColumnInput$()",
      "[style.--standard--masonry-container-directive--gap-row-input]":    "gapRowInput$()",
    },
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
    ],
    standalone:     true,
  },
)
export class MasonryContainerDirective {

  constructor() {
    afterRender(
      (): void => ((
        {
          columnSizerHtmlDivElementRef,
          innerHtmlDivElementRef,
          gutterSizerHtmlDivElementRef,
          masonry,
        }: {
          columnSizerHtmlDivElementRef?: ElementRef<HTMLDivElement>,
          gutterSizerHtmlDivElementRef?: ElementRef<HTMLDivElement>,
          innerHtmlDivElementRef?: ElementRef<HTMLDivElement>,
          masonry?: Masonry,
        }): void => {
        if (columnSizerHtmlDivElementRef && gutterSizerHtmlDivElementRef && innerHtmlDivElementRef)
          if (masonry)
            this.masonry$()?.layout?.();
          else
            this.masonry$.set(new (require("masonry-layout") as typeof Masonry)(
              innerHtmlDivElementRef.nativeElement,
              {
                columnWidth:        columnSizerHtmlDivElementRef.nativeElement,
                gutter:             gutterSizerHtmlDivElementRef.nativeElement,
                itemSelector:       ".harness",
                percentPosition:    true,
                transitionDuration: 0,
              },
            ));
      })(
        {
          columnSizerHtmlDivElementRef: this.columnSizerHtmlDivElementRef$(),
          gutterSizerHtmlDivElementRef: this.gutterSizerHtmlDivElementRef$(),
          innerHtmlDivElementRef:       this.innerHtmlDivElementRef$(),
          masonry:                      this.masonry$(),
        },
      ),
    );
  }

  private readonly masonry$: WritableSignal<Masonry | undefined> = signal<undefined>(undefined);
  private readonly platformId: NonNullable<unknown>              = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly columnSizerHtmlDivElementRef$: WritableSignal<ElementRef<HTMLDivElement> | undefined> = signal<undefined>(undefined);

  protected readonly columnWidth$: Signal<number | undefined> = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<ElementRef<HTMLDivElement> | undefined>(this.columnSizerHtmlDivElementRef$).pipe<ElementRef<HTMLDivElement>, number>(
      filter<ElementRef<HTMLDivElement> | undefined, ElementRef<HTMLDivElement>>(
        (columnSizerHtmlDivElementRef: ElementRef<HTMLDivElement> | undefined): columnSizerHtmlDivElementRef is ElementRef<HTMLDivElement> => !!columnSizerHtmlDivElementRef,
      ),
      switchMap<ElementRef<HTMLDivElement>, Observable<number>>(
        (htmlDivElementRef: ElementRef<HTMLDivElement>): Observable<number> => new Observable<number>(
          (resizeEventObserver: Observer<number>): TeardownLogic => ((resizeObserver: ResizeObserver): TeardownLogic => {
            resizeObserver.observe(htmlDivElementRef.nativeElement);

            return (): void => resizeObserver.disconnect();
          })(
            new ResizeObserver(
              (resizeObserverEntries: ResizeObserverEntry[]): void => resizeEventObserver.next(resizeObserverEntries[0].target.clientWidth),
            ),
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  public readonly columnsInput$: InputSignalWithTransform<number | undefined, number | `${ number }`>   = input<number | undefined, number | `${ number }`>(
    undefined,
    {
      alias:     "columns",
      transform: numberAttribute,
    },
  );
  public readonly gapColumnInput$: InputSignal<ScalarString | Inherit | undefined>                      = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "gapColumn",
    },
  );
  public readonly gapRowInput$: InputSignal<ScalarString | Inherit | undefined>                         = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "gapRow",
    },
  );
  public readonly gutterSizerHtmlDivElementRef$: WritableSignal<ElementRef<HTMLDivElement> | undefined> = signal<undefined>(undefined);
  public readonly innerHtmlDivElementRef$: WritableSignal<ElementRef<HTMLDivElement> | undefined>       = signal<undefined>(undefined);

}
