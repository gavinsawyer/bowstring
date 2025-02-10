import { NgTemplateOutlet }                                                  from "@angular/common";
import { ChangeDetectionStrategy, Component, output, type OutputEmitterRef } from "@angular/core";
import { FormsModule }                                                       from "@angular/forms";
import { FlexboxContainerDirective }                                         from "@standard/directives";


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
      FormsModule,
      NgTemplateOutlet,
    ],
    selector:        "standard--form",
    styleUrl:        "FormComponent.sass",
    templateUrl:     "FormComponent.html",

    standalone: true,
  },
)
export class FormComponent {

  public readonly output: OutputEmitterRef<void> = output<void>(
    {
      alias: "output",
    },
  );

}
