import { Component, effect, type ElementRef, inject, type Signal, viewChild } from "@angular/core";
import { FlexboxContainerDirective, TypographyDirective }                     from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
          "listenToScrollEvent",
        ],
      },
      {
        directive: TypographyDirective,
        inputs:    [
          "fontSizeExponent",
        ],
      },
    ],
    selector:       "standard--header",
    standalone:     true,
    styleUrls:      [
      "HeaderComponent.sass",
    ],
    templateUrl:    "HeaderComponent.html",
  },
)
export class HeaderComponent {

  constructor() {
    effect(
      () => this.flexboxContainerDirective.htmlElementRef$.set(
        this.htmlElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly flexboxContainerDirective: FlexboxContainerDirective = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly htmlElementRef$: Signal<ElementRef<HTMLElement>>     = viewChild.required<ElementRef<HTMLElement>>("htmlElement");

}
