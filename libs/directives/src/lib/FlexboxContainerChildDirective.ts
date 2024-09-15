import { Directive, input, InputSignal, InputSignalWithTransform, numberAttribute } from "@angular/core";
import { Auto, Inherit, ScalarString }                                              from "@standard/types";
import { ContainerDirective }                                                       from "./ContainerDirective";


@Directive(
  {
    host:           {
      "[style.--standard--flexbox-container-child-directive--flex-basis-input]":  "flexBasisInput$()",
      "[style.--standard--flexbox-container-child-directive--flex-grow-input]":   "flexGrowInput$()",
      "[style.--standard--flexbox-container-child-directive--flex-shrink-input]": "flexShrinkInput$()",
    },
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "aspectRatio",
          "alignSelf",
          "bottomPosition",
          "hideScrollbar",
          "leftPosition",
          "listenToResizeEvent",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "rightPosition",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
          "topPosition",
        ],
      },
    ],
    standalone:     true,
  },
)
export class FlexboxContainerChildDirective {

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
