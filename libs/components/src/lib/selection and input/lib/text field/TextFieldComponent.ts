import { NgTemplateOutlet }                                                                                                        from "@angular/common";
import { Component, effect, type ElementRef, forwardRef, inject, input, type InputSignal, type OnDestroy, type Signal, viewChild } from "@angular/core";
import { toSignal }                                                                                                                from "@angular/core/rxjs-interop";
import { type ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule }                             from "@angular/forms";
import { ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, RoundedDirective }                              from "@standard/directives";
import { type SymbolPaths }                                                                                                        from "@standard/interfaces";
import loadSymbolPaths                                                                                                             from "@standard/symbol-paths";
import { fromPromise }                                                                                                             from "rxjs/internal/observable/innerFrom";


@Component(
  {
    hostDirectives: [
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
    effect(
      (): void => {
        this.hoverTranslatingDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly abortController: AbortController                           = new AbortController();
  private readonly hoverTranslatingDirective: HoverTransformingDirective      = inject<HoverTransformingDirective>(HoverTransformingDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>     = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly htmlInputElementRef$: Signal<ElementRef<HTMLInputElement>> = viewChild.required<ElementRef<HTMLInputElement>>("htmlInputElement");

  protected readonly roundedContainerDirective: RoundedDirective                  = inject<RoundedDirective>(RoundedDirective);
  protected readonly xmarkCircleFillSymbolPaths$: Signal<SymbolPaths | undefined> = toSignal<SymbolPaths>(
    fromPromise<SymbolPaths>(
      loadSymbolPaths("XmarkCircleFill"),
    ),
  );

  public readonly autocompleteInput$: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
    {
      alias: "autocomplete",
    },
  );
  public readonly formControlInput$: InputSignal<FormControl<string>> = input.required<FormControl<string>>(
    {
      alias: "formControl",
    },
  );
  public readonly placeholderInput$: InputSignal<string | undefined>  = input<string | undefined>(
    undefined,
    {
      alias: "placeholder",
    },
  );

  public ngOnDestroy(): void {
    this.abortController.abort();
  }
  public registerOnChange(handler: (value: string) => void): void {
    this.htmlInputElementRef$().nativeElement.addEventListener(
      "change",
      (event: Event): void => handler(
        (event.target as HTMLInputElement).value,
      ),
      {
        signal: this.abortController.signal,
      },
    );
  }
  public registerOnTouched(handler: () => void): void {
    this.htmlInputElementRef$().nativeElement.addEventListener(
      "blur",
      (): void => handler(),
      {
        signal: this.abortController.signal,
      },
    );
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.htmlInputElementRef$().nativeElement.disabled = isDisabled;
  }
  public writeValue(value: string): void {
    this.htmlInputElementRef$().nativeElement.value = value;
  }

}
