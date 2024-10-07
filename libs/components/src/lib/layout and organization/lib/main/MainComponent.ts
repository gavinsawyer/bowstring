import { NgTemplateOutlet }          from "@angular/common";
import { Component }                 from "@angular/core";
import { RouterOutlet }              from "@angular/router";
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
      RouterOutlet,
    ],
    selector:       "standard--main",
    standalone:     true,
    styleUrls:      [
      "MainComponent.sass",
    ],
    templateUrl:    "MainComponent.html",
  },
)
export class MainComponent {
}
