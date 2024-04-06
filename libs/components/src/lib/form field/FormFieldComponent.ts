import { Component, ContentChild, ElementRef, forwardRef, OnDestroy, signal, WritableSignal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule }          from "@angular/forms";


@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:   [
    {
      multi:       true,
      provide:     NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof FormFieldComponent => FormFieldComponent,
      ),
    },
  ],
  selector:    "standard--form-field",
  standalone:  true,
  styleUrls:   [
    "FormFieldComponent.sass",
  ],
  templateUrl: "FormFieldComponent.html",
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
  private htmlTextAreaElement?: ElementRef<HTMLTextAreaElement>;

  private readonly abortController: AbortController = new AbortController();

  protected readonly mousedown:            () => void                                             = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && this.transitionTranslate$.set(true);
  protected readonly mouseenter:           () => void                                             = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && void (0);
  protected readonly mouseleave:           () => void                                             = (): void => {
    this
      .transitionTranslate$
      .set(true);

    this
      .translation$
      .set(
        {
          x: 0,
          y: 0,
        },
      );
  };
  protected readonly mousemove:            (mouseEvent: MouseEvent, host: HTMLDivElement) => void = (mouseEvent: MouseEvent, container: HTMLDivElement): void => ((hostBindingClientRect: DOMRect): void => this.translation$.set(
    {
      x: ((2 * ((mouseEvent.clientX - hostBindingClientRect.left) / container.offsetWidth)) - 1) / 8,
      y: ((2 * ((mouseEvent.clientY - hostBindingClientRect.top) / container.offsetHeight)) - 1) / 8,
    },
  ))(
    container.getBoundingClientRect(),
  );
  protected readonly transitionTranslate$: WritableSignal<boolean>                                = signal<boolean>(true);
  protected readonly translation$:         WritableSignal<{ x: number, y: number }>               = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );

  public ngOnDestroy():                                      void {
    this
      .abortController
      .abort();
  }
  public registerOnChange(handler: (value: string) => void): void {
    (this.htmlInputElementRef || this.htmlTextAreaElement as ElementRef<HTMLTextAreaElement>)
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
  public registerOnTouched(handler: () => void):             void {
    (this.htmlInputElementRef || this.htmlTextAreaElement as ElementRef<HTMLTextAreaElement>)
      .nativeElement
      .addEventListener(
        "blur",
        (): void => handler(),
        {
          signal: this.abortController.signal,
        },
      );
  }
  public setDisabledState?(isDisabled: boolean):             void {
    (this.htmlInputElementRef || this.htmlTextAreaElement as ElementRef<HTMLTextAreaElement>)
      .nativeElement
      .disabled = isDisabled;
  }
  public writeValue(value: string):                          void {
    (this.htmlInputElementRef || this.htmlTextAreaElement as ElementRef<HTMLTextAreaElement>)
      .nativeElement
      .value = value;
  }

}
