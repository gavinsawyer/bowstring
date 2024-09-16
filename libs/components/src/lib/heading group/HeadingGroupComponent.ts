import { booleanAttribute, Component, input, type InputSignalWithTransform } from "@angular/core";


@Component(
  {
    host:        {
      "[class.skipStylingFirstLetter]": "skipStylingFirstLetterInput$()",
    },
    selector:    "standard--heading-group",
    standalone:  true,
    styleUrls:   [
      "HeadingGroupComponent.sass",
    ],
    templateUrl: "HeadingGroupComponent.html",
  },
)
export class HeadingGroupComponent {

  public readonly skipStylingFirstLetterInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`> = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "skipStylingFirstLetter",
      transform: booleanAttribute,
    },
  );

}
