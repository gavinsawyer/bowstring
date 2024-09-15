import { Component, contentChild, effect, ElementRef, forwardRef, inject, OnDestroy, Signal, viewChild } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule }                     from "@angular/forms";
import { ContainerDirective, FlexboxContainerChildDirective, RoundedContainerDirective }                 from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: FlexboxContainerChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
      {
        directive: RoundedContainerDirective,
        inputs:    [
          "borderRadiusFactor",
        ],
      },
    ],
    imports:        [
      FormsModule,
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
      (): void => {
        this.containerDirective.htmlElementRef$.set(
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

  private readonly abortController: AbortController                                             = new AbortController();
  private readonly containerDirective: ContainerDirective                                       = inject<ContainerDirective>(ContainerDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>                       = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly htmlInputElementRef$: Signal<ElementRef<HTMLInputElement> | undefined>       = contentChild<ElementRef<HTMLInputElement>>("htmlInputElement");
  private readonly htmlTextAreaElementRef$: Signal<ElementRef<HTMLTextAreaElement> | undefined> = contentChild<ElementRef<HTMLTextAreaElement>>("htmlTextAreaElement");

  protected readonly roundedContainerDirective: RoundedContainerDirective = inject<RoundedContainerDirective>(RoundedContainerDirective);

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
