import { Component, effect, ElementRef, inject, Signal, viewChild } from "@angular/core";
import { RouterOutlet }                                             from "@angular/router";
import { ContainerDirective, FlexboxContainerDirective }            from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "collapsable",
          "columnGap",
          "flexDirection",
          "flexWrap",
          "justifyContent",
          "listenToScrollEvent",
          "rowGap",
        ],
      },
    ],
    imports:        [
      RouterOutlet,
    ],
    selector:       "standard--main",
    standalone:     true,
    styleUrls:      [
      "MainComponent.sass",
    ],
    templateUrl:    "MainComponent.html",
  },
)
export class MainComponent {

  constructor() {
    effect(
      (): void => {
        this.containerDirective.htmlElementRef$.set(
          this.htmlElementRef$(),
        );
        this.flexboxContainerDirective.htmlElementRef$.set(
          this.htmlElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly containerDirective: ContainerDirective               = inject<ContainerDirective>(ContainerDirective);
  private readonly flexboxContainerDirective: FlexboxContainerDirective = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly htmlElementRef$: Signal<ElementRef<HTMLElement>>     = viewChild.required<ElementRef<HTMLElement>>("htmlElement");

}
