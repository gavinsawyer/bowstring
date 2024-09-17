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
