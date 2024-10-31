import { booleanAttribute, Component, DestroyRef, type ElementRef, forwardRef, inject, Injector, input, type InputSignal, type InputSignalWithTransform, model, type ModelSignal, Renderer2, signal, type Signal, viewChild } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                                                                                         from "@angular/core/rxjs-interop";
import { ControlValueAccessor, NG_VALUE_ACCESSOR }                                                                                                                                                                            from "@angular/forms";
import { type SymbolPaths }                                                                                                                                                                                                   from "@standard/interfaces";
import { MaskPipe, UnmaskPipe }                                                                                                                                                                                               from "@standard/pipes";
import loadSymbolPaths                                                                                                                                                                                                        from "@standard/symbol-paths";
import { combineLatestWith, filter, firstValueFrom }                                                                                                                                                                          from "rxjs";
import { fromPromise }                                                                                                                                                                                                        from "rxjs/internal/observable/innerFrom";
import { v7 as uuidV7 }                                                                                                                                                                                                       from "uuid";
import providers                                                                                                                                                                                                              from "../inputs/lib/providers";


@Component(
  {
    host:       {
      "[class.disabled]": "disabledModel$()",
    },
    providers:  [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof InputComponent => InputComponent,
        ),
      },
      ...providers,
    ],
    standalone: true,
    template:   "",
  },
)
export class InputComponent
  implements ControlValueAccessor {

  constructor() {
    toObservable<ElementRef<HTMLInputElement> | undefined>(this.htmlInputElementRef$).pipe<ElementRef<HTMLInputElement>, [ ElementRef<HTMLInputElement>, string | undefined ], [ ElementRef<HTMLInputElement>, string | undefined ]>(
      filter<ElementRef<HTMLInputElement> | undefined, ElementRef<HTMLInputElement>>(
        (htmlInputElementRef?: ElementRef<HTMLInputElement>): htmlInputElementRef is ElementRef<HTMLInputElement> => !!htmlInputElementRef,
      ),
      combineLatestWith<ElementRef<HTMLInputElement>, [ string | undefined ]>(toObservable<string | undefined>(this.maskInput$)),
      takeUntilDestroyed<[ ElementRef<HTMLInputElement>, string | undefined ]>(this.destroyRef),
    ).subscribe(
      ([ { nativeElement: htmlInputElement }, mask ]: [ ElementRef<HTMLInputElement>, string | undefined ]): void => this.renderer2.setProperty(
        htmlInputElement,
        "value",
        this.maskPipe.transform(
          this.value,
          mask,
        ),
      ),
    );
  }

  private readonly destroyRef: DestroyRef                                     = inject<DestroyRef>(DestroyRef);
  private readonly htmlInputElementRef$: Signal<ElementRef<HTMLInputElement>> = viewChild.required<ElementRef<HTMLInputElement>>("htmlInputElement");
  private readonly injector: Injector                                         = inject<Injector>(Injector);
  private readonly maskPipe: MaskPipe                                         = inject<MaskPipe>(MaskPipe);
  private readonly renderer2: Renderer2                                       = inject<Renderer2>(Renderer2);
  private readonly unmaskPipe: UnmaskPipe                                     = inject<UnmaskPipe>(UnmaskPipe);

  protected readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>             = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  protected readonly inputName$: Signal<`standard--input-directive--input-${ string }`> = signal<`standard--input-directive--input-${ string }`>(`standard--input-directive--input-${ uuidV7() }`);
  protected readonly xmarkCircleFillSymbolPaths$: Signal<SymbolPaths | undefined>       = toSignal<SymbolPaths>(
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

  protected value: string = "" as const;

  protected onChange?(): void
  protected onInput(): void {
    this.value = this.unmaskPipe.transform(
      this.htmlInputElementRef$().nativeElement.value,
      this.maskInput$(),
    );

    this.renderer2.setProperty(
      this.htmlInputElementRef$().nativeElement,
      "value",
      this.maskPipe.transform(
        this.value,
        this.maskInput$(),
      ),
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
  public setDisabledState(isDisabled: boolean): void {
    this.disabledModel$.set(isDisabled);
  }
  public writeValue(value: string): void {
    this.value = value;

    firstValueFrom<ElementRef<HTMLInputElement> | undefined>(
      toObservable<ElementRef<HTMLInputElement> | undefined>(
        this.htmlInputElementRef$,
        {
          injector: this.injector,
        },
      ),
    ).then<void>(
      (htmlInputElementRef?: ElementRef<HTMLInputElement>): void => {
        if (htmlInputElementRef)
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
