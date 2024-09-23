import { NgTemplateOutlet }                                                                                             from "@angular/common";
import { Component, contentChild, effect, type ElementRef, forwardRef, inject, type OnDestroy, type Signal, viewChild } from "@angular/core";
import { type ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule }                               from "@angular/forms";
import { ContainerDirective, FlexboxChildDirective, RoundedDirective }                                                  from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "bottomPosition",
          "leftPosition",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "rightPosition",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
          "topPosition",
        ],
      },
      {
        directive: FlexboxChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "roundnessFactor",
        ],
      },
    ],
    imports: [
      FormsModule,
      NgTemplateOutlet,
      ReactiveFormsModule,
    ],
    providers:      [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof FormFieldComponent => FormFieldComponent,
        ),
      },
    ],
    selector:       "standard--form-field",
    standalone:     true,
    styleUrls:      [
      "FormFieldComponent.sass",
    ],
    templateUrl:    "FormFieldComponent.html",
  },
)
export class FormFieldComponent
  implements ControlValueAccessor, OnDestroy {

  constructor() {
    effect(
      (): void => this.roundedContainerDirective.htmlElementRef$.set(
        this.htmlDivElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly abortController: AbortController                                             = new AbortController();
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>                       = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly htmlInputElementRef$: Signal<ElementRef<HTMLInputElement> | undefined>       = contentChild<ElementRef<HTMLInputElement>>("htmlInputElement");
  private readonly htmlTextAreaElementRef$: Signal<ElementRef<HTMLTextAreaElement> | undefined> = contentChild<ElementRef<HTMLTextAreaElement>>("htmlTextAreaElement");

  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

  public ngOnDestroy(): void {
    this.abortController.abort();
  }
  public registerOnChange(handler: (value: string) => void): void {
    (this.htmlInputElementRef$() || this.htmlTextAreaElementRef$() as ElementRef<HTMLTextAreaElement>).nativeElement.addEventListener(
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
    (this.htmlInputElementRef$() || this.htmlTextAreaElementRef$() as ElementRef<HTMLTextAreaElement>).nativeElement.addEventListener(
      "blur",
      (): void => handler(),
      {
        signal: this.abortController.signal,
      },
    );
  }
  public setDisabledState?(isDisabled: boolean): void {
    (this.htmlInputElementRef$() || this.htmlTextAreaElementRef$() as ElementRef<HTMLTextAreaElement>).nativeElement.disabled = isDisabled;
  }
  public writeValue(value: string): void {
    (this.htmlInputElementRef$() || this.htmlTextAreaElementRef$() as ElementRef<HTMLTextAreaElement>).nativeElement.value = value;
  }

}
