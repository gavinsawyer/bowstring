import { Component, ElementRef, forwardRef, Input, OnDestroy, signal, ViewChild, WritableSignal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule }              from "@angular/forms";


@Component({
  imports:     [
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:   [
    {
      multi:       true,
      provide:     NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof InputComponent => InputComponent,
      ),
    },
  ],
  selector:    "standard--input",
  standalone:  true,
  styleUrls:   [
    "./InputComponent.sass",
  ],
  templateUrl: "./InputComponent.html",
})
export class InputComponent implements ControlValueAccessor, OnDestroy {

  @Input({
    required: true
  })
  public type!: "email" | "number" | "password" | "search" | "tel" | "text" | "url";

  @Input() public placeholder?: string;
  @Input() public tabindex?:    number;

  @ViewChild("htmlInputElement", {
    read:   ElementRef<HTMLInputElement>,
    static: true,
  })
  private htmlInputElementRef!: ElementRef<HTMLInputElement>;

  private readonly abortController: AbortController = new AbortController();

  public readonly mousedown:            () => void                                             = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && this.transitionTranslate$.set(true);
  public readonly mouseenter:           () => void                                             = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && void (0);
  public readonly mouseleave:           () => void                                             = (): void => {
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
  public readonly mousemove:            (mouseEvent: MouseEvent, host: HTMLDivElement) => void = (mouseEvent: MouseEvent, container: HTMLDivElement): void => ((hostBindingClientRect: DOMRect): void => this.translation$.set(
    {
      x: ((2 * ((mouseEvent.clientX - hostBindingClientRect.left) / container.offsetWidth)) - 1) / 8,
      y: ((2 * ((mouseEvent.clientY - hostBindingClientRect.top) / container.offsetHeight)) - 1) / 8,
    },
  ))(
    container.getBoundingClientRect(),
  );
  public readonly transitionTranslate$: WritableSignal<boolean>                                = signal<boolean>(true);
  public readonly translation$:         WritableSignal<{ x: number, y: number }>               = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );

  ngOnDestroy(): void {
    this
      .abortController
      .abort();
  }
  registerOnChange(handler: (value: string) => void): void {
    this
      .htmlInputElementRef
      .nativeElement
      .addEventListener<"change">(
        "change",
        (event: Event): void => handler(
          (event.target as HTMLInputElement).value,
        ),
        {
          signal: this.abortController.signal,
        },
      );
  }
  registerOnTouched(handler: () => void): void {
    this
      .htmlInputElementRef
      .nativeElement
      .addEventListener<"blur">(
        "blur",
        (): void => handler(),
        {
          signal: this.abortController.signal,
        },
      );
  }
  setDisabledState?(isDisabled: boolean): void {
    this
      .htmlInputElementRef
      .nativeElement
      .disabled = isDisabled;
  }
  writeValue(value: string): void {
    this
      .htmlInputElementRef
      .nativeElement
      .value = value;
  }

}
