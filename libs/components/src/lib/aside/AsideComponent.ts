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
          "columnGap",
          "flexDirection",
          "flexWrap",
          "justifyContent",
          "listenToScrollEvent",
          "rowGap",
        ],
      },
    ],
    selector:       "standard--aside",
    standalone:     true,
    styleUrls:      [
      "AsideComponent.sass",
    ],
    templateUrl:    "AsideComponent.html",
  },
)
export class AsideComponent {

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
