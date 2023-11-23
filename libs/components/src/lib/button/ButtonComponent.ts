import { NgClass, NgIf, NgTemplateOutlet }                                from "@angular/common";
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from "@angular/core";


@Component({
  imports:     [
    NgClass,
    NgTemplateOutlet,
    NgIf,
  ],
  selector:    "standard--button",
  standalone:  true,
  styleUrls:   [
    "ButtonComponent.sass",
  ],
  templateUrl: "ButtonComponent.html",
})
export class ButtonComponent {

  @Output() public readonly action: EventEmitter<void> = new EventEmitter<void>();

  @Input({
    required: true,
  })       public label!: string;
  @Input() public url?:   string;

  public readonly mouseenter:           () => void                               = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    100,
  ) && void (0);
  public readonly mouseleave:           () => void                               = (): void => {
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
  public readonly mousemove:            (mouseEvent: MouseEvent) => void         = (mouseEvent: MouseEvent): void => this
    .translation$
    .set(
      {
        x: ((2 * (mouseEvent.offsetX / (mouseEvent.target as HTMLButtonElement).offsetWidth)) - 1) / 8,
        y: ((2 * (mouseEvent.offsetY / (mouseEvent.target as HTMLButtonElement).offsetHeight)) - 1) / 8,
      },
    );
  public readonly transitionTranslate$: WritableSignal<boolean> = signal<boolean>(true);
  public readonly translation$:         WritableSignal<{ x: number, y: number }> = signal<{
    x: number,
    y: number,
  }>(
    {
      x: 0,
      y: 0,
    },
  );
}
