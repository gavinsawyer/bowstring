import { Component, effect, type ElementRef, inject, type Signal, viewChild } from "@angular/core";
import { FlexboxContainerDirective }                                          from "@standard/directives";


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
          "scrollLeft",
          "scrollTop",
        ],
      },
    ],
    selector:       "standard--flexbox-container",
    standalone:     true,
    styleUrls:      [
      "FlexboxContainerComponent.sass",
    ],
    templateUrl:    "FlexboxContainerComponent.html",
  },
)
export class FlexboxContainerComponent {

  constructor() {
    effect(
      (): void => this.flexboxContainerDirective.htmlElementRef$.set(
        this.htmlDivElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly flexboxContainerDirective: FlexboxContainerDirective   = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

}
