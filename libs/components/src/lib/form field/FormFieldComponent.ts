import { Component, ContentChild, ElementRef, forwardRef, inject, OnDestroy }        from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { TranslationHoverDirective }                                                 from "@standard/directives";


@Component({
  hostDirectives: [
    TranslationHoverDirective,
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
})
export class FormFieldComponent implements ControlValueAccessor, OnDestroy {

  @ContentChild("htmlInputElement", {
    read:   ElementRef<HTMLInputElement>,
    static: true,
  })
  private htmlInputElementRef?: ElementRef<HTMLInputElement>;

  @ContentChild("htmlTextAreaElement", {
    read:   ElementRef<HTMLTextAreaElement>,
    static: true,
  })
  private htmlTextAreaElementRef?: ElementRef<HTMLTextAreaElement>;

  private readonly abortController: AbortController = new AbortController();

  protected readonly translationHoverDirective: TranslationHoverDirective = inject<TranslationHoverDirective>(TranslationHoverDirective);

  public ngOnDestroy      ():                                 void {
    this
      .abortController
      .abort();
  }
  public registerOnChange (handler: (value: string) => void): void {
    (this.htmlInputElementRef || this.htmlTextAreaElementRef as ElementRef<HTMLTextAreaElement>)
      .nativeElement
      .addEventListener(
        "change",
        (event: Event): void => handler(
          (event.target as HTMLInputElement).value,
        ),
        {
          signal: this.abortController.signal,
        },
      );
  }
  public registerOnTouched(handler: () => void):              void {
    (this.htmlInputElementRef || this.htmlTextAreaElementRef as ElementRef<HTMLTextAreaElement>)
      .nativeElement
      .addEventListener(
        "blur",
        (): void => handler(),
        {
          signal: this.abortController.signal,
        },
      );
  }
  public setDisabledState?(isDisabled: boolean):              void {
    (this.htmlInputElementRef || this.htmlTextAreaElementRef as ElementRef<HTMLTextAreaElement>)
      .nativeElement
      .disabled = isDisabled;
  }
  public writeValue       (value: string):                    void {
    (this.htmlInputElementRef || this.htmlTextAreaElementRef as ElementRef<HTMLTextAreaElement>)
      .nativeElement
      .value = value;
  }

}
