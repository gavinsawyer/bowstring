import { Component, input, type InputSignal } from "@angular/core";


@Component(
  {
    selector:    "standard--text",
    standalone:  true,
    styleUrls:   [
      "TextComponent.sass",
    ],
    templateUrl: "TextComponent.html",
  },
)
export class TextComponent {

  public readonly input$: InputSignal<string> = input.required<string>(
    {
      alias: "input",
    },
  );

}
