import { NgComponentOutlet }                                                                                                         from "@angular/common";
import { Component, ElementRef, HostBinding, HostListener, inject, Input, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                                              from "@angular/router";
import * as symbolComponents                                                                                                         from "../symbols";


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
export class ButtonComponent implements OnInit, OnChanges {

  @HostBinding("class.transitionTranslate") protected get classTransitionTranslate(): boolean { return this.transitionTranslate$(); }
  @HostBinding("style.--translation-x")     protected get styleXTranslation():        number  { return this.translation$().x; }
  @HostBinding("style.--translation-y")     protected get styleYTranslation():        number  { return this.translation$().y; }

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

  @Input() public color?:    "primary" | "none";
  @Input() public disabled?: boolean;
  @Input() public form?:     "flat" | "raised" | "symbol";
  @Input() public symbol?:   keyof typeof symbolComponents extends `${infer name}SymbolComponent` ? name : never;
  @Input() public tabindex?: number;
  @Input() public text?:     string;
  @Input() public type?:     "button" | "reset" | "submit";
  @Input() public url?:      string;

  private readonly elementRef: ElementRef = inject<ElementRef>(ElementRef);

  protected readonly symbolComponent$:     WritableSignal<typeof symbolComponents[keyof typeof symbolComponents] | undefined> = signal<typeof symbolComponents[keyof typeof symbolComponents] | undefined>(
    this.symbol && symbolComponents[`${this.symbol}SymbolComponent`]
  );
  protected readonly transitionTranslate$: WritableSignal<boolean>                                                            = signal<boolean>(true);
  protected readonly translation$:         WritableSignal<{ x: number, y: number }>                                           = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );

  public ngOnChanges(changes: SimpleChanges): void {
    Object.hasOwnProperty.call(changes, "symbol") && this
      .symbolComponent$
      .set(
        symbolComponents[`${changes["symbol"].currentValue as keyof typeof symbolComponents extends `${infer name}SymbolComponent` ? name : never}SymbolComponent`]
      );
  }
  public ngOnInit():                          void {
    this
      .symbolComponent$
      .set(
        this.symbol && symbolComponents[`${this.symbol}SymbolComponent`]
      );
  }

}
