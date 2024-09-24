import { NgOptimizedImage }                                                                                                                            from "@angular/common";
import { Component, effect, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, type Signal, viewChild } from "@angular/core";
import { ContainerDirective, ElevatedDirective, FlexboxChildDirective, RoundedDirective }                                                              from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
      {
        directive: ElevatedDirective,
        inputs:    [
          "materialOpacity",
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
      {
        directive: RoundedDirective,
        inputs:    [
          "roundnessFactor",
        ],
      },
    ],
    imports:        [
      NgOptimizedImage,
    ],
    selector:       "standard--image",
    standalone:     true,
    styleUrls:      [
      "ImageComponent.sass",
    ],
    templateUrl:    "ImageComponent.html",
  },
)
export class ImageComponent {

  constructor() {
    effect(
      (): void => this.roundedContainerDirective.htmlElementRef$.set(
        this.htmlImageElementRef$(),
      ),
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly htmlImageElementRef$: Signal<ElementRef<HTMLImageElement>> = viewChild.required<ElementRef<HTMLImageElement>>("htmlImageElement");

  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

  public readonly altInput$: InputSignal<string | undefined>                             = input<string | undefined>(
    undefined,
    {
      alias: "alt",
    },
  );
  public readonly heightInput$: InputSignalWithTransform<number, number | `${ number }`> = input.required<number, number | `${ number }`>(
    {
      alias:     "height",
      transform: numberAttribute,
    },
  );
  public readonly srcInput$: InputSignal<string | URL>                                   = input.required<string | URL>(
    {
      alias: "src",
    },
  );
  public readonly widthInput$: InputSignalWithTransform<number, number | `${ number }`>  = input.required<number, number | `${ number }`>(
    {
      alias:     "width",
      transform: numberAttribute,
    },
  );

}
