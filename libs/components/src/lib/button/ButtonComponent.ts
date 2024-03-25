import { NgClass, NgIf, NgTemplateOutlet }                                from "@angular/common";
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }                                   from "@angular/router";
import { SymbolComponent }                                                from "../symbol/SymbolComponent";


@Component({
  imports: [
    NgClass,
    NgTemplateOutlet,
    NgIf,
    RouterLink,
    RouterLinkActive,
    SymbolComponent,
  ],
  selector:    "standard--button",
  standalone:  true,
  styleUrls:   [
    "ButtonComponent.sass",
  ],
  templateUrl: "ButtonComponent.html",
})
export class ButtonComponent {

  @Input()
  public disabled?: boolean;
  @Input({
    required: true,
  })
  public label!: string;
  @Input()
  public symbol?: string;
  @Input()
  public url?: string;

  public readonly mouseenter:           () => void                                             = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    100,
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
  public readonly mousemove:            (mouseEvent: MouseEvent, host: HTMLDivElement) => void = (mouseEvent: MouseEvent, host: HTMLDivElement): void => ((hostBindingClientRect: DOMRect): void => ((cursorPosition: { x: number, y: number }): void => this.translation$.set(
    {
      x: ((2 * (cursorPosition.x / host.offsetWidth)) - 1) / 8,
      y: ((2 * (cursorPosition.y / host.offsetHeight)) - 1) / 8,
    },
  ))(
    {
      x: mouseEvent.clientX - hostBindingClientRect.left,
      y: mouseEvent.clientY - hostBindingClientRect.top,
    },
  ))(host.getBoundingClientRect());
  public readonly transitionTranslate$: WritableSignal<boolean>                                = signal<boolean>(true);
  public readonly translation$:         WritableSignal<{ x: number, y: number }>               = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );
}
