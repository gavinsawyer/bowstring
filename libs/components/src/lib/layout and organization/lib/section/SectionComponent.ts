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
    selector:       "standard--section",
    standalone:     true,
    styleUrls:      [
      "SectionComponent.sass",
    ],
    templateUrl:    "SectionComponent.html",
  },
)
export class SectionComponent {
}
