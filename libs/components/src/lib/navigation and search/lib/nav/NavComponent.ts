import { NgTemplateOutlet }                   from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FlexboxContainerDirective }          from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
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
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "standard--nav",
    styleUrls:       [
      "NavComponent.sass",
    ],
    templateUrl:     "NavComponent.html",

    standalone: true,
  },
)
export class NavComponent {
}
