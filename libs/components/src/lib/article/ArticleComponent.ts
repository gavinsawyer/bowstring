import { Component, effect, type ElementRef, inject, type Signal, viewChild } from "@angular/core";
import { ContainerDirective, FlexboxChildDirective }                          from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "aspectRatio",
          "alignSelf",
          "bottomPosition",
          "hideScrollbar",
          "leftPosition",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "rightPosition",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
          "topPosition",
        ],
      },
      {
        directive: FlexboxChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
    ],
    selector:       "standard--article",
    standalone:     true,
    styleUrls:      [
      "ArticleComponent.sass",
    ],
    templateUrl:    "ArticleComponent.html",
  },
)
export class ArticleComponent {

  constructor() {
    effect(
      (): void => this.containerDirective.htmlElementRef$.set(
        this.htmlElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly containerDirective: ContainerDirective           = inject<ContainerDirective>(ContainerDirective);
  private readonly htmlElementRef$: Signal<ElementRef<HTMLElement>> = viewChild.required<ElementRef<HTMLElement>>("htmlElement");

}
