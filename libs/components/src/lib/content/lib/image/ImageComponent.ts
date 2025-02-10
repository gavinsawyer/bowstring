import { NgOptimizedImage, NgTemplateOutlet }                                                                                                                                        from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, type Signal, viewChild } from "@angular/core";
import { RouterLink }                                                                                                                                                                from "@angular/router";
import { CanvasDirective, ContainerDirective, ElevatedDirective, HoverTransformingDirective, WellRoundedDirective }                                                                  from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.appearance-circular]":             "appearanceInput$() === 'circular'",
      "[class.appearance-transparent]":          "appearanceInput$() === 'transparent'",
      "[class.hasUrlInput]":                     "urlInput$()",
      "[style.--standard--image--aspect-ratio]": "widthInput$() + '/' + heightInput$()",
    },
    hostDirectives:  [
      {
        directive: CanvasDirective,
      },
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
          "level",
          "materialOpacity",
        ],
      },
      {
        directive: HoverTransformingDirective,
      },
      {
        directive: WellRoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:         [
      NgOptimizedImage,
      NgTemplateOutlet,
      RouterLink,
    ],
    selector:        "standard--image",
    styleUrl:        "ImageComponent.sass",
    templateUrl:     "ImageComponent.html",

    standalone: true,
  },
)
export class ImageComponent {

  constructor() {
    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlDivElementRef$());
        this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly hoverTransformingDirective: HoverTransformingDirective = inject<HoverTransformingDirective>(HoverTransformingDirective);
  protected readonly wellRoundedDirective: WellRoundedDirective             = inject<WellRoundedDirective>(WellRoundedDirective);

  public readonly altInput$: InputSignal<string | undefined>                             = input<string | undefined>(
    undefined,
    {
      alias: "alt",
    },
  );
  public readonly appearanceInput$: InputSignal<"circular" | "transparent" | undefined>  = input<"circular" | "transparent" | undefined>(
    undefined,
    {
      alias: "appearance",
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
  public readonly urlInput$: InputSignal<string | undefined>                             = input<string | undefined>(
    undefined,
    {
      alias: "url",
    },
  );
  public readonly widthInput$: InputSignalWithTransform<number, number | `${ number }`>  = input.required<number, number | `${ number }`>(
    {
      alias:     "width",
      transform: numberAttribute,
    },
  );

}
