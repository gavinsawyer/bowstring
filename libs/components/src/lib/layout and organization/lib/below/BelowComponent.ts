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
    selector:       "standard--below",
    standalone:     true,
    styleUrls:      [
      "BelowComponent.sass",
    ],
    templateUrl:    "BelowComponent.html",
  },
)
export class BelowComponent {
}
