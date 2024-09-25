import { Directive, input, type InputSignal }                                                                             from "@angular/core";
import { type DistributedAlignment, type GridPositionalAlignment, type Inherit, type NormalAlignment, type ScalarString } from "@standard/types";
import { ContainerDirective }                                                                                             from "../container/ContainerDirective";
import { FlexboxChildDirective }                                                                                          from "../flexbox child/FlexboxChildDirective";


@Directive(
  {
    host:           {
      "[style.--standard--grid-container-directive--align-content]":   "alignContentInput$()",
      "[style.--standard--grid-container-directive--align-items]":     "alignItemsInput$()",
      "[style.--standard--grid-container-directive--gap-column]":      "gapColumnInput$()",
      "[style.--standard--grid-container-directive--gap-row]":         "gapRowInput$()",
      "[style.--standard--grid-container-directive--justify-content]": "justifyContentInput$()",
    },
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
      {
        directive: FlexboxChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
    ],
    standalone:     true,
  },
)
export class GridContainerDirective {

  public readonly alignContentInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>   = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    {
      alias: "alignContent",
    },
  );
  public readonly alignItemsInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>     = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    {
      alias: "alignItems",
    },
  );
  public readonly gapColumnInput$: InputSignal<ScalarString | Inherit | undefined>                                                = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "gapColumn",
    },
  );
  public readonly justifyContentInput$: InputSignal<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined> = input<DistributedAlignment | GridPositionalAlignment | NormalAlignment | undefined>(
    undefined,
    {
      alias: "justifyContent",
    },
  );
  public readonly gapRowInput$: InputSignal<ScalarString | Inherit | undefined>                                                   = input<ScalarString | Inherit | undefined>(
    undefined,
    {
      alias: "gapRow",
    },
  );

}
