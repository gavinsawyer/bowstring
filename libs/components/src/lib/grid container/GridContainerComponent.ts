import { NgTemplateOutlet }       from "@angular/common";
import { Component }              from "@angular/core";
import { GridContainerDirective } from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: GridContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--grid-container",
    standalone:     true,
    styleUrls:      [
      "GridContainerComponent.sass",
    ],
    templateUrl:    "GridContainerComponent.html",
  },
)
export class GridContainerComponent {
}
