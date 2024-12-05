import { NgTemplateOutlet }                                                                                 from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, type ElementRef, inject, type Signal, viewChild } from "@angular/core";
import { ContainerDirective, ElevatedDirective, PrimaryDirective, RoundedDirective }                        from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
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
        directive: PrimaryDirective,
        inputs:    [
          "backgroundDark",
          "backgroundLight",
          "foregroundDark",
          "foregroundLight",
        ],
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "standard--capsule",
    styleUrls:       [
      "CapsuleComponent.sass",
    ],
    templateUrl:     "CapsuleComponent.html",

    standalone: true,
  },
)
export class CapsuleComponent {

  constructor() {
    afterRender(
      (): void => this.roundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly roundedDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

}
