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
        ],
      },
    ],
    selector:       "standard--section",
    standalone:     true,
    styleUrls:      [
      "SectionComponent.sass",
    ],
    templateUrl:    "SectionComponent.html",
  },
)
export class SectionComponent {

  constructor() {
    effect(
      (): void => this.flexboxContainerDirective.htmlElementRef$.set(
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
