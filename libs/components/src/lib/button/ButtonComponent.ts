import { NgComponentOutlet, NgTemplateOutlet }                       from "@angular/common";
import { Component, Input, numberAttribute, signal, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }                              from "@angular/router";
import { SymbolComponent }                                           from "../symbol/SymbolComponent";


@Component({
  imports: [
    NgComponentOutlet,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  selector:    "standard--button",
  standalone:  true,
  styleUrls:   [
    "ButtonComponent.sass",
  ],
  templateUrl: "ButtonComponent.html",
})
export class ButtonComponent extends SymbolComponent {

  @Input() public color?:    "primary" | "none";
  @Input() public disabled?: boolean;
  @Input() public form?:     "flat" | "raised" | "symbol";
  @Input() public tabindex?: number;
  @Input() public text?:     string;
  @Input() public type?:     "button" | "reset" | "submit";
  @Input() public url?:      string;

  @Input({
    transform: numberAttribute,
  })
  public grow?: number;

  @Input({
    transform: numberAttribute,
  })
  public shrink?: number;

  protected readonly mouseenter:           () => void                               = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && void (0);
  protected readonly mouseleave:           () => void                               = (): void => {
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
  protected readonly mousemove:            (mouseEvent: MouseEvent) => void         = (mouseEvent: MouseEvent): void => {
    console.log(mouseEvent.target);

    mouseEvent.target instanceof HTMLElement ? ((domRect: DOMRect): void => this.translation$.set(
      {
        x: ((2 * ((mouseEvent.clientX - domRect.left) / domRect.width)) - 1) / 8,
        y: ((2 * ((mouseEvent.clientY - domRect.top) / domRect.height)) - 1) / 8,
      },
    ))(
      mouseEvent.target.getBoundingClientRect(),
    ) : void (0);
  };
  protected readonly transitionTranslate$: WritableSignal<boolean>                  = signal<boolean>(true);
  protected readonly translation$:         WritableSignal<{ x: number, y: number }> = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );

}
