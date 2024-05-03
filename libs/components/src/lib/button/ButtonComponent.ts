import { NgComponentOutlet, NgTemplateOutlet }                                                           from "@angular/common";
import { Component, ElementRef, HostBinding, Input, numberAttribute, signal, ViewChild, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                  from "@angular/router";
import { SymbolComponent }                                                                               from "../symbol/SymbolComponent";


@Component({
  imports:     [
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

  @HostBinding("style.--standard--button--flex-grow")
  @Input({
    transform: numberAttribute,
  })
  public flexGrow?: number;

  @HostBinding("style.--standard--button--flex-shrink")
  @Input({
    transform: numberAttribute,
  })
  public flexShrink?: number;

  @Input() public color?:    "primary" | "none";
  @Input() public disabled?: boolean;
  @Input() public form?:     "flat" | "raised" | "symbol";
  @Input() public tabindex?: number;
  @Input() public text?:     string;
  @Input() public type?:     "button" | "reset" | "submit";
  @Input() public url?:      string;

  @ViewChild("htmlAnchorElement", {
    read: ElementRef<HTMLAnchorElement>,
  })
  private htmlAnchorElementRef?: ElementRef<HTMLAnchorElement>;
  @ViewChild("htmlButtonElement", {
    read: ElementRef<HTMLButtonElement>,
  })
  private htmlButtonElementRef?: ElementRef<HTMLButtonElement>;

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
    ((domRect: DOMRect): void => this.translation$.set(
      {
        x: ((2 * ((mouseEvent.clientX - domRect.left) / domRect.width)) - 1) / 8,
        y: ((2 * ((mouseEvent.clientY - domRect.top) / domRect.height)) - 1) / 8,
      },
    ))(
      (this.htmlAnchorElementRef || this.htmlButtonElementRef as ElementRef<HTMLButtonElement>).nativeElement.getBoundingClientRect(),
    );
  };
  protected readonly transitionTranslate$: WritableSignal<boolean>                  = signal<boolean>(true);
  protected readonly translation$:         WritableSignal<{ x: number, y: number }> = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );

}
