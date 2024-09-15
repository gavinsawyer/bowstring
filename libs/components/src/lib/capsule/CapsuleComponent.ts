import { Component, effect, ElementRef, inject, input, InputSignal, Signal, viewChild } from "@angular/core";
import { ElevatedContainerDirective, RoundedContainerDirective }                        from "@standard/directives";


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
        directive: RoundedContainerDirective,
        inputs:    [
          "borderRadiusFactor",
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
      (): void => {
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlSpanElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly htmlSpanElementRef$: Signal<ElementRef<HTMLSpanElement>> = viewChild.required<ElementRef<HTMLSpanElement>>("htmlSpanElement");

  protected readonly roundedContainerDirective: RoundedContainerDirective = inject<RoundedContainerDirective>(RoundedContainerDirective);

  public readonly textInput$: InputSignal<string> = input.required<string>(
    {
      alias: "text",
    },
  );

}
