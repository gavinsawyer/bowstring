import { NgTemplateOutlet }                   from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GridContainerDirective }             from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: GridContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "gapColumn",
          "gapRow",
          "gridAutoFlow",
          "gridAutoColumns",
          "gridAutoRows",
          "gridTemplateColumns",
          "gridTemplateRows",
          "justifyContent",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "standard--grid-container",
    styleUrls:       [
      "GridContainerComponent.sass",
    ],
    templateUrl:     "GridContainerComponent.html",

    standalone: true,
  },
)
export class GridContainerComponent {
}
