import { Component, effect, type ElementRef, inject, type Signal, viewChild } from "@angular/core";
import { ContainerDirective, FlexboxContainerDirective }                      from "@standard/directives";


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
      (): void => {
        this.containerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
        this.flexboxContainerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly containerDirective: ContainerDirective                 = inject<ContainerDirective>(ContainerDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly flexboxContainerDirective: FlexboxContainerDirective = inject<FlexboxContainerDirective>(FlexboxContainerDirective);

}
