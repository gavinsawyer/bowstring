import { NgComponentOutlet }                                from "@angular/common";
import { Component, Input, OnInit, signal, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }                     from "@angular/router";
import * as symbolComponents                                from "../symbols";


@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    NgComponentOutlet,
  ],
  selector:    "standard--button",
  standalone:  true,
  styleUrls:   [
    "ButtonComponent.sass",
  ],
  templateUrl: "ButtonComponent.html",
})
export class ButtonComponent implements OnInit {

  @Input({
    required: true,
  })
  public text!: string;

  @Input() public disabled?: boolean;
  @Input() public symbol?:   keyof typeof symbolComponents extends `${ infer name }SymbolComponent` ? name : never;
  @Input() public tabindex?: number;
  @Input() public url?:      string;

  public readonly mouseenter:           () => void                                                                         = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && void (0);
  public readonly mouseleave:           () => void                                                                         = (): void => {
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
  public readonly mousemove:            (mouseEvent: MouseEvent, host: HTMLDivElement) => void                             = (mouseEvent: MouseEvent, container: HTMLDivElement): void => ((hostBindingClientRect: DOMRect): void => this.translation$.set(
    {
      x: ((2 * ((mouseEvent.clientX - hostBindingClientRect.left) / container.offsetWidth)) - 1) / 8,
      y: ((2 * ((mouseEvent.clientY - hostBindingClientRect.top) / container.offsetHeight)) - 1) / 8,
    },
  ))(
    container.getBoundingClientRect(),
  );
  public readonly symbolComponent$:     WritableSignal<typeof symbolComponents[keyof typeof symbolComponents] | undefined> = signal<typeof symbolComponents[keyof typeof symbolComponents] | undefined>(this.symbol && symbolComponents[`${ this.symbol }SymbolComponent`]);
  public readonly transitionTranslate$: WritableSignal<boolean>                                                            = signal<boolean>(true);
  public readonly translation$:         WritableSignal<{ x: number, y: number }>                                           = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );

  ngOnInit(): void {
    this
      .symbolComponent$
      .set(this.symbol && symbolComponents[`${ this.symbol }SymbolComponent`]);
  }

}
