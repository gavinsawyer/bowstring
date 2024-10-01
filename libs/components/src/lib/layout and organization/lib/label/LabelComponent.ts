import { Component, input, type InputSignal } from "@angular/core";


@Component(
  {
    selector:    "standard--label",
    standalone:  true,
    styleUrls:   [
      "LabelComponent.sass",
    ],
    templateUrl: "LabelComponent.html",
  },
)
export class LabelComponent {

  public readonly input$: InputSignal<string> = input.required<string>(
    {
      alias: "input",
    },
  );

}
