import { booleanAttribute, ChangeDetectionStrategy, Component, input, type InputSignal, type InputSignalWithTransform } from "@angular/core";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector:        "standard--combobox-input-option",
    templateUrl:     "ComboboxInputOptionComponent.html",

    standalone: true,
  },
)
export class ComboboxInputOptionComponent {

  public readonly disabledInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "disabled",
      transform: booleanAttribute,
    },
  );
  public readonly labelInput$: InputSignal<string>                                                                         = input.required<string>(
    {
      alias: "label",
    },
  );
  public readonly valueInput$: InputSignal<string>                                                                         = input.required<string>(
    {
      alias: "value",
    },
  );

}
