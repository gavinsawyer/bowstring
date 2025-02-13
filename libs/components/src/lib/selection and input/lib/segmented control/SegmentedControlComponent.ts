import { isPlatformBrowser, NgTemplateOutlet }                                                                                                                                                                                  from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, contentChildren, ElementRef, forwardRef, inject, Injector, input, type InputSignal, model, type ModelSignal, PLATFORM_ID, Renderer2, signal, type Signal, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                               from "@angular/core/rxjs-interop";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule }                                                                                                                                                                               from "@angular/forms";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, PrimaryDirective, WellRoundedDirective }                                                                                                                from "@bowstring/directives";
import { SEGMENTED_CONTROL_VALUE_ACCESSOR }                                                                                                                                                                                     from "@bowstring/injection-tokens";
import { type SegmentedControlValueAccessor }                                                                                                                                                                                   from "@bowstring/interfaces";
import { combineLatest, firstValueFrom, type Observable, startWith, switchMap }                                                                                                                                                 from "rxjs";
import { v7 as uuidV7 }                                                                                                                                                                                                         from "uuid";
import { SegmentedControlOptionComponent }                                                                                                                                                                                      from "../segmented control option/SegmentedControlOptionComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[style.--bowstring--segmented-control--selected-option-index]":  "getOptionIndex(value)",
      "[style.--bowstring--segmented-control--selected-option-offset]": "getOptionOffset(value)",
      "[style.--bowstring--segmented-control--selected-option-width]":  "getOptionWidth(value)",
    },
    hostDirectives:  [
      {
        directive: CanvasDirective,
      },
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
      {
        directive: PrimaryDirective,
      },
      {
        directive: WellRoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
      ReactiveFormsModule,
      WellRoundedDirective,
    ],
    providers:       [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof SegmentedControlComponent => SegmentedControlComponent,
        ),
      },
      {
        provide:     SEGMENTED_CONTROL_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof SegmentedControlComponent => SegmentedControlComponent,
        ),
      },
    ],
    selector:        "bowstring--segmented-control",
    styleUrl:        "SegmentedControlComponent.sass",
    templateUrl:     "SegmentedControlComponent.html",

    standalone: true,
  },
)
export class SegmentedControlComponent
  implements SegmentedControlValueAccessor {

  constructor() {
    afterRender(
      (): void => {
        this.pickerWellRoundedDirective$().htmlElementRef$.set(this.pickerHtmlDivElementRef$());
        this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>       = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly htmlSelectElementRef$: Signal<ElementRef<HTMLSelectElement>> = viewChild.required<ElementRef<HTMLSelectElement>>("htmlSelectElement");
  private readonly injector: Injector                                           = inject<Injector>(Injector);
  private readonly pickerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("pickerHtmlDivElement");
  private readonly pickerWellRoundedDirective$: Signal<WellRoundedDirective>    = viewChild.required<WellRoundedDirective>("pickerWellRoundedDirective");
  private readonly platformId: NonNullable<unknown>                             = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly renderer2: Renderer2                                         = inject<Renderer2>(Renderer2);

  protected readonly inputName$: Signal<`bowstring--segmented-control--input-${ string }`> = signal<`bowstring--segmented-control--input-${ string }`>(`bowstring--segmented-control--input-${ uuidV7() }`);
  protected readonly options$: Signal<readonly SegmentedControlOptionComponent[]>         = contentChildren<SegmentedControlOptionComponent>(
    SegmentedControlOptionComponent,
  );
  protected readonly optionWidths$: Signal<(number | undefined)[] | undefined>            = isPlatformBrowser(this.platformId) ? toSignal<(number | undefined)[] | undefined>(
    toObservable<readonly SegmentedControlOptionComponent[]>(
      this.options$,
    ).pipe<(number | undefined)[], (number | undefined)[] | undefined>(
      switchMap<readonly SegmentedControlOptionComponent[], Observable<(number | undefined)[]>>(
        (optionDirectives: readonly SegmentedControlOptionComponent[]): Observable<(number | undefined)[]> => combineLatest<(number | undefined)[]>(
          optionDirectives.map<Observable<number | undefined>>(
            ({ width$ }: SegmentedControlOptionComponent): Observable<number | undefined> => toObservable<number | undefined>(
              width$,
              {
                injector: this.injector,
              },
            ),
          ),
        ),
      ),
      startWith(undefined),
    ),
    {
      requireSync: true,
    },
  ) : signal<undefined>(undefined);
  protected readonly wellRoundedDirective: WellRoundedDirective                           = inject<WellRoundedDirective>(WellRoundedDirective);

  public readonly disabledModel$: ModelSignal<boolean | undefined> = model<boolean | undefined>(
    undefined,
    {
      alias: "disabled",
    },
  );
  public readonly labelInput$: InputSignal<string | undefined>     = input<string | undefined>(
    undefined,
    {
      alias: "label",
    },
  );

  public value: string | null = null;

  protected getOptionOffset(value: string | null): number | undefined {
    const index: number = this.options$().findIndex(
      ({ valueInput$ }: SegmentedControlOptionComponent): boolean => valueInput$() === value,
    );

    return this.optionWidths$()?.slice(
      0,
      index >= 0 ? index : 0,
    ).reduce(
      (
        previousValue?: number,
        currentValue?: number,
      ): number => (previousValue || 0) + (currentValue || 0),
      0,
    );
  }
  protected getOptionWidth(value: string | null): number | undefined {
    const index: number = this.options$().findIndex(
      ({ valueInput$ }: SegmentedControlOptionComponent): boolean => valueInput$() === value,
    );

    return this.optionWidths$()?.[index >= 0 ? index : 0];
  }
  protected onChange?(): void
  protected onInput(): void {
    this.value = this.htmlSelectElementRef$().nativeElement.value;

    this.renderer2.setProperty(
      this.htmlSelectElementRef$().nativeElement,
      "value",
      this.value,
    );
  }
  protected onTouched?(): void

  public getOptionIndex(value: string | null): number {
    const index: number = this.options$().findIndex(
      ({ valueInput$ }: SegmentedControlOptionComponent): boolean => valueInput$() === value,
    );

    return index >= 0 ? index : 0;
  };
  public registerOnChange(handler: (value: string) => void): void {
    this.onChange = (): void => {
      this.onInput();

      handler(this.value || "");
    };
  }
  public registerOnTouched(handler: () => void): void {
    this.onTouched = handler;
  }
  public setDisabledState(isDisabled: boolean): void {
    this.disabledModel$.set(isDisabled);
  }
  public writeValue(value: string | null): void {
    this.value = value;

    firstValueFrom<ElementRef<HTMLSelectElement> | undefined>(
      toObservable<ElementRef<HTMLSelectElement> | undefined>(
        this.htmlSelectElementRef$,
        {
          injector: this.injector,
        },
      ),
    ).then<void>(
      (htmlSelectElementRef?: ElementRef<HTMLSelectElement>): void => {
        if (htmlSelectElementRef)
          this.renderer2.setProperty(
            htmlSelectElementRef.nativeElement,
            "value",
            value,
          );
      },
    );
  }

}
