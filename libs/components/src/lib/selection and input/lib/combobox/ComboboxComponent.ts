import { KeyValuePipe, NgTemplateOutlet }                                                                                                                                                                                                  from "@angular/common";
import { afterRender, booleanAttribute, Component, DestroyRef, type ElementRef, forwardRef, inject, Injector, input, type InputSignal, type InputSignalWithTransform, model, type ModelSignal, Renderer2, signal, type Signal, viewChild } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                                                                                                      from "@angular/core/rxjs-interop";
import { type ControlValueAccessor, NG_VALUE_ACCESSOR }                                                                                                                                                                                    from "@angular/forms";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, RoundedDirective }                                                                                                                     from "@standard/directives";
import { type SymbolPaths }                                                                                                                                                                                                                from "@standard/interfaces";
import { InsertZwnjsPipe, MaskPipe, UnmaskPipe }                                                                                                                                                                                           from "@standard/pipes";
import loadSymbolPaths                                                                                                                                                                                                                     from "@standard/symbol-paths";
import { InputComponentOptions }                                                                                                                                                                                                           from "@standard/types";
import { combineLatestWith, firstValueFrom }                                                                                                                                                                                               from "rxjs";
import { fromPromise }                                                                                                                                                                                                                     from "rxjs/internal/observable/innerFrom";
import { v4 as uuid }                                                                                                                                                                                                                      from "uuid";


@Component(
  {
    host:           {
      "[class.disabled]": "disabledModel$()",
    },
    hostDirectives: [
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
        directive: HoverTransformingDirective,
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:        [
      InsertZwnjsPipe,
      KeyValuePipe,
      MaskPipe,
      NgTemplateOutlet,
    ],
    providers:      [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof ComboboxComponent => ComboboxComponent,
        ),
      },
      MaskPipe,
      UnmaskPipe,
    ],
    selector:       "standard--combobox",
    standalone:     true,
    styleUrls:      [
      "ComboboxComponent.sass",
    ],
    templateUrl:    "ComboboxComponent.html",
  },
)
export class ComboboxComponent
  implements ControlValueAccessor {

  constructor() {
    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlDivElementRef$());
        this.roundedContainerDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );

    toObservable<ElementRef<HTMLInputElement>>(this.htmlInputElementRef$).pipe<[ ElementRef<HTMLInputElement>, string | undefined ], [ ElementRef<HTMLInputElement>, string | undefined ]>(
      combineLatestWith<ElementRef<HTMLInputElement>, [ string | undefined ]>(toObservable<string | undefined>(this.maskInput$)),
      takeUntilDestroyed<[ ElementRef<HTMLInputElement>, string | undefined ]>(this.destroyRef),
    ).subscribe(
      ([ htmlInputElementRef, mask ]: [ ElementRef<HTMLInputElement>, string | undefined ]): void => this.renderer2.setProperty(
        htmlInputElementRef.nativeElement,
        "value",
        this.maskPipe.transform(
          this.value,
          mask,
        ),
      ),
    );
  }

  private readonly destroyRef: DestroyRef                                     = inject<DestroyRef>(DestroyRef);
  private readonly hoverTransformingDirective: HoverTransformingDirective     = inject<HoverTransformingDirective>(HoverTransformingDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>     = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly htmlInputElementRef$: Signal<ElementRef<HTMLInputElement>> = viewChild.required<ElementRef<HTMLInputElement>>("htmlInputElement");
  private readonly injector: Injector                                         = inject<Injector>(Injector);
  private readonly maskPipe: MaskPipe                                         = inject<MaskPipe>(MaskPipe);
  private readonly renderer2: Renderer2                                       = inject<Renderer2>(Renderer2);
  private readonly unmaskPipe: UnmaskPipe                                     = inject<UnmaskPipe>(UnmaskPipe);

  protected readonly inputName$: Signal<`standard--combobox--input-${ string }`>   = signal<`standard--combobox--input-${ string }`>(`standard--combobox--input-${ uuid() }`);
  protected readonly optionsId$: Signal<`standard--combobox--options-${ string }`> = signal<`standard--combobox--options-${ string }`>(`standard--combobox--options-${ uuid() }`);
  protected readonly roundedContainerDirective: RoundedDirective                   = inject<RoundedDirective>(RoundedDirective);
  protected readonly xmarkCircleFillSymbolPaths$: Signal<SymbolPaths | undefined>  = toSignal<SymbolPaths>(
    fromPromise<SymbolPaths>(
      loadSymbolPaths("XmarkCircleFill"),
    ),
  );

  public readonly autocompleteInput$: InputSignal<string | undefined>                                                                  = input<string | undefined>(
    undefined,
    {
      alias: "autocomplete",
    },
  );
  public readonly disabledModel$: ModelSignal<boolean | undefined>                                                                     = model<boolean | undefined>(
    undefined,
    {
      alias: "disabled",
    },
  );
  public readonly explicitAutocompleteInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "explicitAutocomplete",
      transform: booleanAttribute,
    },
  );
  public readonly labelInput$: InputSignal<string | undefined>                                                                         = input<string | undefined>(
    undefined,
    {
      alias: "label",
    },
  );
  public readonly maskInput$: InputSignal<string | undefined>                                                                          = input<string | undefined>(
    undefined,
    {
      alias: "mask",
    },
  );
  public readonly optionsInput$: InputSignal<InputComponentOptions>                                                                    = input.required<InputComponentOptions>(
    {
      alias: "options",
    },
  );
  public readonly placeholderInput$: InputSignal<string | undefined>                                                                   = input<string | undefined>(
    undefined,
    {
      alias: "placeholder",
    },
  );
  public readonly typeInput$: InputSignal<"email" | "password" | "tel" | undefined>                                                    = input<"email" | "password" | "tel" | undefined>(
    undefined,
    {
      alias: "type",
    },
  );

  private value: string = "" as const;

  protected onBlur(): void {
    if (Object.values<string>(this.optionsInput$()).includes(this.value))
      this.onChange?.();
  }
  protected onChange?(): void
  protected onInput(): void {
    ((
      {
        mask,
        value,
      }: { mask?: string, value: string }): void => {
      this.value = this.unmaskPipe.transform(
        value,
        mask,
      );

      this.renderer2.setProperty(
        this.htmlInputElementRef$().nativeElement,
        "value",
        this.maskPipe.transform(
          this.value,
          mask,
        ),
      );
    })(
      {
        mask:  this.maskInput$(),
        value: this.htmlInputElementRef$().nativeElement.value,
      },
    );
  }
  protected onTouched?(): void

  public registerOnChange(handler: (value: string) => void): void {
    this.onChange = (): void => {
      this.onInput();

      handler(this.value);
    };
  }
  public registerOnTouched(handler: () => void): void {
    this.onTouched = handler;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabledModel$.set(isDisabled);
  }
  public writeValue(value: string): void {
    this.value = value;

    firstValueFrom<ElementRef<HTMLInputElement>>(
      toObservable<ElementRef<HTMLInputElement>>(
        this.htmlInputElementRef$,
        {
          injector: this.injector,
        },
      ),
    ).then<void>(
      (htmlInputElementRef: ElementRef<HTMLInputElement>): void => {
        firstValueFrom<string | undefined>(
          toObservable<string | undefined>(
            this.maskInput$,
            {
              injector: this.injector,
            },
          ),
        ).then<void>(
          (mask?: string): void => this.renderer2.setProperty(
            htmlInputElementRef.nativeElement,
            "value",
            this.maskPipe.transform(
              value,
              mask,
            ),
          ),
        );
      },
    );
  }

}
