import { NgTemplateOutlet }                                from "@angular/common";
import { Component, input, type InputSignalWithTransform } from "@angular/core";
import { ContainerDirective }                              from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
    ],
    selector:       "standard--label",
    standalone:     true,
    styleUrls:      [
      "LabelComponent.sass",
    ],
    templateUrl:    "LabelComponent.html",
    imports:        [
      NgTemplateOutlet,
    ],
  },
)
export class LabelComponent {

  public readonly input$: InputSignalWithTransform<string, string> = input.required<string>(
    {
      alias: "input",
    },
  );

}
