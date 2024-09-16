import { NgTemplateOutlet }                   from "@angular/common";
import { Component, input, type InputSignal } from "@angular/core";


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
    selector:    "standard--list-item",
    standalone:  true,
    styleUrls:   [
      "ListItemComponent.sass",
    ],
    templateUrl: "ListItemComponent.html",
  },
)
export class ListItemComponent {

  public typeInput$: InputSignal<"inline" | "ordered" | "unordered"> = input.required<"inline" | "ordered" | "unordered">(
    {
      alias: "type",
    },
  );

}
