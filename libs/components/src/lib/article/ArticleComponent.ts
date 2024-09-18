import { Component }                                 from "@angular/core";
import { ContainerDirective, FlexboxChildDirective } from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "aspectRatio",
          "alignSelf",
          "bottomPosition",
          "hideScrollbar",
          "leftPosition",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "rightPosition",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
          "topPosition",
        ],
      },
      {
        directive: FlexboxChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
    ],
    selector:       "standard--article",
    standalone:     true,
    styleUrls:      [
      "ArticleComponent.sass",
    ],
    templateUrl:    "ArticleComponent.html",
  },
)
export class ArticleComponent {
}
