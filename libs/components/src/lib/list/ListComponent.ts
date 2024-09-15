import { NgTemplateOutlet }              from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";


@Component(
  {
    host:        {
      "[class.inline]":    "typeInput$() === 'inline'",
      "[class.ordered]":   "typeInput$() === 'ordered'",
      "[class.unordered]": "typeInput$() === 'unordered'",
    },
    imports:     [
      NgTemplateOutlet,
    ],
    selector:    "standard--list",
    standalone:  true,
    styleUrls:   [
      "ListComponent.sass",
    ],
    templateUrl: "ListComponent.html",
  },
)
export class ListComponent {

  public typeInput$: InputSignal<"inline" | "ordered" | "unordered"> = input.required<"inline" | "ordered" | "unordered">(
    {
      alias: "type",
    },
  );

}
