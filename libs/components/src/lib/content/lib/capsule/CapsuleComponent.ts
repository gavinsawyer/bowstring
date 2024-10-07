import { NgTemplateOutlet }                                                          from "@angular/common";
import { afterRender, Component, type ElementRef, inject, type Signal, viewChild }   from "@angular/core";
import { ContainerDirective, ElevatedDirective, PrimaryDirective, RoundedDirective } from "@standard/directives";


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
    imports:        [
      NgTemplateOutlet,
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
    afterRender(
      (): void => this.roundedContainerDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

}
