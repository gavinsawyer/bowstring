import { NgTemplateOutlet }          from "@angular/common";
import { Component }                 from "@angular/core";
import { FlexboxContainerDirective } from "@standard/directives";


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
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--above",
    standalone:     true,
    styleUrls:      [
      "AboveComponent.sass",
    ],
    templateUrl:    "AboveComponent.html",
  },
)
export class AboveComponent {
}
