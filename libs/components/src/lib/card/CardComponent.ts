import { Component, effect, type ElementRef, inject, type Signal, viewChild }                                                            from "@angular/core";
import { ContainerDirective, ElevatedContainerDirective, FlexboxContainerDirective, GlassContainerDirective, RoundedContainerDirective } from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ElevatedContainerDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
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
      {
        directive: GlassContainerDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: RoundedContainerDirective,
        inputs:    [
          "borderRadiusFactor",
        ],
      },
    ],
    selector:       "standard--card",
    standalone:     true,
    styleUrls:      [
      "CardComponent.sass",
    ],
    templateUrl:    "CardComponent.html",
  },
)
export class CardComponent {

  constructor() {
    effect(
      (): void => {
        this.containerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
        this.flexboxContainerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly containerDirective: ContainerDirective                 = inject<ContainerDirective>(ContainerDirective);
  private readonly flexboxContainerDirective: FlexboxContainerDirective   = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly roundedContainerDirective: RoundedContainerDirective = inject<RoundedContainerDirective>(RoundedContainerDirective);

}
