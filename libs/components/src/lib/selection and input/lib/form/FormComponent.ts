import { NgTemplateOutlet }                         from "@angular/common";
import { Component, output, type OutputEmitterRef } from "@angular/core";
import { FormsModule }                              from "@angular/forms";
import { FlexboxContainerDirective }                from "@standard/directives";


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
      FormsModule,
      NgTemplateOutlet,
    ],
    selector:       "standard--form",
    standalone:     true,
    styleUrls:      [
      "FormComponent.sass",
    ],
    templateUrl:    "FormComponent.html",
  },
)
export class FormComponent {

  public readonly output: OutputEmitterRef<void> = output<void>(
    {
      alias: "output",
    },
  );

}
