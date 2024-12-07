import { NgTemplateOutlet }                           from "@angular/common";
import { ChangeDetectionStrategy, Component }         from "@angular/core";
import { CanvasDirective, FlexboxContainerDirective } from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: CanvasDirective,
      },
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
    selector:        "standard--banner",
    styleUrls:       [
      "BannerComponent.sass",
    ],
    templateUrl:     "BannerComponent.html",

    standalone: true,
  },
)
export class BannerComponent {
}
