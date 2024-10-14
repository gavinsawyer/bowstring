import { NgTemplateOutlet }   from "@angular/common";
import { Component }          from "@angular/core";
import { ContainerDirective } from "@standard/directives";


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
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--divider",
    standalone:     true,
    styleUrls:      [
      "DividerComponent.sass",
    ],
    templateUrl:    "DividerComponent.html",
  },
)
export class DividerComponent {
}
