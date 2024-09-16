import { Component, effect, type ElementRef, inject, input, type InputSignal, type Signal, viewChild } from "@angular/core";
import { ElevatedDirective, RoundedDirective }                                                         from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ElevatedDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: RoundedDirective,
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

  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

  public readonly textInput$: InputSignal<string> = input.required<string>(
    {
      alias: "text",
    },
  );

}
