import { NgTemplateOutlet }                               from "@angular/common";
import { Component }                                      from "@angular/core";
import { FlexboxContainerDirective, TypographyDirective } from "@standard/directives";


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
      {
        directive: TypographyDirective,
        inputs:    [
          "fontSizeExponent",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--header",
    standalone:     true,
    styleUrls:      [
      "HeaderComponent.sass",
    ],
    templateUrl:    "HeaderComponent.html",
  },
)
export class HeaderComponent {
}
