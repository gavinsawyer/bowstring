import { NgTemplateOutlet }                               from "@angular/common";
import { ChangeDetectionStrategy, Component }             from "@angular/core";
import { FlexboxContainerDirective, TypographyDirective } from "@bowstring/directives";


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
      {
        directive: TypographyDirective,
        inputs:    [
          "fontSizeExponent",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "bowstring--header",
    styleUrl:        "HeaderComponent.sass",
    templateUrl:     "HeaderComponent.html",

    standalone: true,
  },
)
export class HeaderComponent {
}
