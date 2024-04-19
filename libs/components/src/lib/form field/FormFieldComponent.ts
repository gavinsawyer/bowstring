import { Component, ContentChild, ElementRef, forwardRef, HostBinding, HostListener, inject, OnDestroy, signal, WritableSignal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule }                                             from "@angular/forms";


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

  @HostBinding("class.transitionTranslate") protected get classTransitionTranslate(): boolean { return this.transitionTranslate$(); }
  @HostBinding("style.--translation-x")     protected get styleXTranslation():        number  { return this.translation$().x; }
  @HostBinding("style.--translation-y")     protected get styleYTranslation():        number  { return this.translation$().y; }

  @HostListener("mousedown")  protected readonly mousedown:  () => void = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && this.transitionTranslate$.set(true);
  @HostListener("mouseenter") protected readonly mouseenter: () => void = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && void (0);
  @HostListener("mouseleave") protected readonly mouseleave: () => void = (): void => {
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

  @HostListener("mousemove", [
    "$event",
  ])
  protected readonly mousemove: (mouseEvent: MouseEvent) => void = (mouseEvent: MouseEvent): void => this.elementRef.nativeElement && ((domRect: DOMRect): void => this.translation$.set(
    {
      x: ((2 * ((mouseEvent.clientX - domRect.left) / domRect.width)) - 1) / 8,
      y: ((2 * ((mouseEvent.clientY - domRect.top) / domRect.height)) - 1) / 8,
    },
  ))(
    this.elementRef.nativeElement.getBoundingClientRect(),
  );

  private readonly abortController: AbortController = new AbortController();
  private readonly elementRef:      ElementRef      = inject<ElementRef>(ElementRef);

  protected readonly transitionTranslate$: WritableSignal<boolean>                  = signal<boolean>(true);
  protected readonly translation$:         WritableSignal<{ x: number, y: number }> = signal<{ x: number, y: number }>(
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
