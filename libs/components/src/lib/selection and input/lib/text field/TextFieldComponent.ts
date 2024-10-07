import { isPlatformBrowser, NgTemplateOutlet }                                                                                                                                                                                   from "@angular/common";
import { afterRender, booleanAttribute, Component, type ElementRef, forwardRef, inject, Injector, input, type InputSignal, type InputSignalWithTransform, numberAttribute, type OnDestroy, PLATFORM_ID, type Signal, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                                                                                                                from "@angular/core/rxjs-interop";
import { type ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule }                                                                                                                           from "@angular/forms";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, RoundedDirective }                                                                                                           from "@standard/directives";
import { type SymbolPaths }                                                                                                                                                                                                      from "@standard/interfaces";
import loadSymbolPaths                                                                                                                                                                                                           from "@standard/symbol-paths";
import { firstValueFrom }                                                                                                                                                                                                        from "rxjs";
import { fromPromise }                                                                                                                                                                                                           from "rxjs/internal/observable/innerFrom";


@Component(
  {
    host:           {
      "[class.disabled]": "disabledInput$() || false",
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
      FormsModule,
      NgTemplateOutlet,
      ReactiveFormsModule,
    ],
    providers:      [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof TextFieldComponent => TextFieldComponent,
        ),
      },
    ],
    selector:       "standard--text-field",
    standalone:     true,
    styleUrls:      [
      "TextFieldComponent.sass",
    ],
    templateUrl:    "TextFieldComponent.html",
  },
)
export class TextFieldComponent
  implements ControlValueAccessor, OnDestroy {

  constructor() {
    afterRender(
      (): void => {
        this.hoverTranslatingDirective.htmlElementRef$.set(this.htmlDivElementRef$());
        this.roundedContainerDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );
  }

  private readonly abortController: AbortController                           = new AbortController();
  private readonly hoverTranslatingDirective: HoverTransformingDirective      = inject<HoverTransformingDirective>(HoverTransformingDirective);
  private readonly injector: Injector                                         = inject<Injector>(Injector);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>     = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly htmlInputElementRef$: Signal<ElementRef<HTMLInputElement>> = viewChild.required<ElementRef<HTMLInputElement>>("htmlInputElement");
  private readonly platformId: NonNullable<unknown>                           = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly roundedContainerDirective: RoundedDirective                  = inject<RoundedDirective>(RoundedDirective);
  protected readonly xmarkCircleFillSymbolPaths$: Signal<SymbolPaths | undefined> = toSignal<SymbolPaths>(
    fromPromise<SymbolPaths>(
      loadSymbolPaths("XmarkCircleFill"),
    ),
  );

  public readonly autocompleteInput$: InputSignal<string | undefined>                                                      = input<string | undefined>(
    undefined,
    {
      alias: "autocomplete",
    },
  );
  public readonly disabledInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "disabled",
      transform: booleanAttribute,
    },
  );
  public readonly formControlInput$: InputSignal<FormControl<string>>                                                      = input.required<FormControl<string>>(
    {
      alias: "formControl",
    },
  );
  public readonly placeholderInput$: InputSignal<string | undefined>                                                       = input<string | undefined>(
    undefined,
    {
      alias: "placeholder",
    },
  );
  public readonly tabIndexOverrideInput$: InputSignalWithTransform<number | undefined, number | `${ number }`>             = input<number | undefined, number | `${ number }`>(
    undefined,
    {
      alias:     "tabIndexOverride",
      transform: numberAttribute,
    },
  );
  public readonly typeInput$: InputSignal<"email" | "password" | undefined>                                                = input<"email" | "password" | undefined>(
    undefined,
    {
      alias: "type",
    },
  );

  public ngOnDestroy(): void {
    this.abortController.abort();
  }
  public registerOnChange(handler: (value: string) => void): void {
    if (isPlatformBrowser(this.platformId))
      firstValueFrom<ElementRef<HTMLInputElement>>(
        toObservable<ElementRef<HTMLInputElement>>(
          this.htmlInputElementRef$,
          {
            injector: this.injector,
          },
        ),
      ).then<void>(
        (htmlInputElementRef: ElementRef<HTMLInputElement>): void => htmlInputElementRef.nativeElement.addEventListener(
          "change",
          (event: Event): void => handler(
            (event.target as HTMLInputElement).value,
          ),
          {
            signal: this.abortController.signal,
          },
        ),
      );
  }
  public registerOnTouched(handler: () => void): void {
    if (isPlatformBrowser(this.platformId))
      firstValueFrom<ElementRef<HTMLInputElement>>(
        toObservable<ElementRef<HTMLInputElement>>(
          this.htmlInputElementRef$,
          {
            injector: this.injector,
          },
        ),
      ).then<void>(
        (htmlInputElementRef: ElementRef<HTMLInputElement>): void => htmlInputElementRef.nativeElement.addEventListener(
          "blur",
          (): void => handler(),
          {
            signal: this.abortController.signal,
          },
        ),
      );
  }
  public setDisabledState?(isDisabled: boolean): void {
    if (isPlatformBrowser(this.platformId))
      firstValueFrom<ElementRef<HTMLInputElement>>(
        toObservable<ElementRef<HTMLInputElement>>(
          this.htmlInputElementRef$,
          {
            injector: this.injector,
          },
        ),
      ).then<void>(
        (htmlInputElementRef: ElementRef<HTMLInputElement>): void => {
          htmlInputElementRef.nativeElement.disabled = isDisabled;
        },
      );
  }
  public writeValue(value: string): void {
    if (isPlatformBrowser(this.platformId))
      firstValueFrom<ElementRef<HTMLInputElement>>(
        toObservable<ElementRef<HTMLInputElement>>(
          this.htmlInputElementRef$,
          {
            injector: this.injector,
          },
        ),
      ).then<void>(
        (htmlInputElementRef: ElementRef<HTMLInputElement>): void => {
          htmlInputElementRef.nativeElement.value = value;
        },
      );
  }

}
