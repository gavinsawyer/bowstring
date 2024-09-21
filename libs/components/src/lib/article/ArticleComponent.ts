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
