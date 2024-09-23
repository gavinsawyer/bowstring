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
    selector:       "standard--aside",
    standalone:     true,
    styleUrls:      [
      "AsideComponent.sass",
    ],
    templateUrl:    "AsideComponent.html",
  },
)
export class AsideComponent {
}
