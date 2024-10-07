import { NgTemplateOutlet }                                                                                                                                            from "@angular/common";
import { booleanAttribute, Component, input, type InputSignal, type InputSignalWithTransform, numberAttribute, output, type OutputEmitterRef, type Signal, viewChild } from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                                                                                from "@angular/router";
import { CanvasDirective, FlexboxContainerDirective }                                                                                                                  from "@standard/directives";


@Component(
  {
    host:           {
      "[class.disabled]": "disabledInput$() || routerLinkActive$()?.isActive || false",
    },
    hostDirectives: [
      {
        directive: CanvasDirective,
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
      RouterLink,
      RouterLinkActive,
    ],
    selector:       "standard--link",
    standalone:     true,
    styleUrls:      [
      "LinkComponent.sass",
    ],
    templateUrl:    "LinkComponent.html",
  },
)
export class LinkComponent {

  protected readonly routerLinkActive$: Signal<RouterLinkActive | undefined> = viewChild<RouterLinkActive>(RouterLinkActive);

  public readonly disabledInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`> = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "disabled",
      transform: booleanAttribute,
    },
  );
  public readonly output: OutputEmitterRef<void>                                                               = output<void>(
    {
      alias: "output",
    },
  );
  public readonly tabIndexOverrideInput$: InputSignalWithTransform<number | undefined, number | `${ number }`> = input<number | undefined, number | `${ number }`>(
    undefined,
    {
      alias:     "tabIndexOverride",
      transform: numberAttribute,
    },
  );
  public readonly typeInput$: InputSignal<"reset" | "submit" | undefined>                                      = input<"reset" | "submit" | undefined>(
    undefined,
    {
      alias: "type",
    },
  );
  public readonly urlInput$: InputSignal<string | undefined>                                                   = input<string | undefined>(
    undefined,
    {
      alias: "url",
    },
  );

}
