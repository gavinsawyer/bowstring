import { Directive, input, type InputSignal, type InputSignalWithTransform, numberAttribute } from "@angular/core";
import { type Auto, type Inherit, type ScalarString }                                         from "@standard/types";


@Directive(
  {
    host:       {
      "[style.--standard--flexbox-child-directive--flex-basis-input]":  "flexBasisInput$()",
      "[style.--standard--flexbox-child-directive--flex-grow-input]":   "flexGrowInput$()",
      "[style.--standard--flexbox-child-directive--flex-shrink-input]": "flexShrinkInput$()",
    },
    standalone: true,
  },
)
export class FlexboxChildDirective {

  public readonly flexBasisInput$: InputSignal<Auto | ScalarString | Inherit | undefined>                                    = input<Auto | ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "flexBasis",
    },
  );
  public readonly flexGrowInput$: InputSignalWithTransform<Inherit | number | undefined, Inherit | number | `${ number }`>   = input<Inherit | number | undefined, Inherit | number | `${ number }`>(
    undefined,
    {
      alias:     "flexGrow",
      transform: numberAttribute,
    },
  );
  public readonly flexShrinkInput$: InputSignalWithTransform<Inherit | number | undefined, Inherit | number | `${ number }`> = input<Inherit | number | undefined, Inherit | number | `${ number }`>(
    undefined,
    {
      alias:     "flexShrink",
      transform: numberAttribute,
    },
  );

}
