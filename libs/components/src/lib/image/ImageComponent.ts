import { NgOptimizedImage }                                                                                                                            from "@angular/common";
import { Component, effect, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, type Signal, viewChild } from "@angular/core";
import { ContainerDirective, ElevatedContainerDirective, FlexboxContainerChildDirective, RoundedContainerDirective }                                   from "@standard/directives";


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
        directive: FlexboxContainerChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
      {
        directive: RoundedContainerDirective,
        inputs:    [
          "borderRadiusFactor",
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
      (): void => {
        this.containerDirective.htmlElementRef$.set(
          this.htmlImageElementRef$(),
        );
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlImageElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly containerDirective: ContainerDirective                     = inject<ContainerDirective>(ContainerDirective);
  private readonly htmlImageElementRef$: Signal<ElementRef<HTMLImageElement>> = viewChild.required<ElementRef<HTMLImageElement>>("htmlImageElement");

  protected readonly roundedContainerDirective: RoundedContainerDirective = inject<RoundedContainerDirective>(RoundedContainerDirective);

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
