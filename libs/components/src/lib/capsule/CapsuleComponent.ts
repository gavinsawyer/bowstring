import { Component, effect, type ElementRef, inject, input, type InputSignal, type Signal, viewChild } from "@angular/core";
import { ContainerDirective, ElevatedDirective, RoundedDirective }                                     from "@standard/directives";


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
        directive: ElevatedDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "roundnessFactor",
        ],
      },
    ],
    selector:       "standard--capsule",
    standalone:     true,
    styleUrls:      [
      "CapsuleComponent.sass",
    ],
    templateUrl:    "CapsuleComponent.html",
  },
)
export class CapsuleComponent {

  constructor() {
    effect(
      (): void => this.roundedContainerDirective.htmlElementRef$.set(
        this.htmlSpanElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly htmlSpanElementRef$: Signal<ElementRef<HTMLSpanElement>> = viewChild.required<ElementRef<HTMLSpanElement>>("htmlSpanElement");

  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

  public readonly textInput$: InputSignal<string> = input.required<string>(
    {
      alias: "text",
    },
  );

}
