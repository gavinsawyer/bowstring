import { NgTemplateOutlet }                                                                                       from "@angular/common";
import { ChangeDetectionStrategy, Component, contentChildren, input, type InputSignal, type Signal, TemplateRef } from "@angular/core";
import { ListItemDirective }                                                                                      from "@bowstring/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "bowstring--list",
    styleUrl:        "ListComponent.sass",
    templateUrl:     "ListComponent.html",

    standalone: true,
  },
)
export class ListComponent {

  protected readonly itemTemplateRefs$: Signal<readonly TemplateRef<ListItemDirective>[]> = contentChildren<ListItemDirective, TemplateRef<ListItemDirective>>(
    ListItemDirective,
    {
      read: TemplateRef,
    },
  );

  public typeInput$: InputSignal<"inline" | "ordered" | "unordered"> = input.required<"inline" | "ordered" | "unordered">(
    {
      alias: "type",
    },
  );

}
