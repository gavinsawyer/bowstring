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
    selector:       "standard--flexbox-container",
    standalone:     true,
    styleUrls:      [
      "FlexboxContainerComponent.sass",
    ],
    templateUrl:    "FlexboxContainerComponent.html",
  },
)
export class FlexboxContainerComponent {
}
