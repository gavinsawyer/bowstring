import { NgTemplateOutlet }                                                                                                                                                    from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, input, type InputSignal, type InputSignalWithTransform, output, type OutputEmitterRef, type Signal, viewChild } from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                                                                                        from "@angular/router";
import { CanvasDirective, FlexboxContainerDirective, PrimaryDirective }                                                                                                        from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.disabled]": "disabledInput$() || routerLinkActive$()?.isActive || false",
    },
    hostDirectives:  [
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
      {
        directive: PrimaryDirective,
      },
    ],
    imports:         [
      NgTemplateOutlet,
      RouterLink,
      RouterLinkActive,
    ],
    selector:        "standard--link",
    styleUrls:       [
      "LinkComponent.sass",
    ],
    templateUrl:     "LinkComponent.html",

    standalone: true,
  },
)
export class LinkComponent {

  protected readonly routerLinkActive$: Signal<RouterLinkActive | undefined> = viewChild<RouterLinkActive>(RouterLinkActive);

  public readonly disabledInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "disabled",
      transform: booleanAttribute,
    },
  );
  public readonly exactInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined>    = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "exact",
      transform: booleanAttribute,
    },
  );
  public readonly output: OutputEmitterRef<void>                                                                           = output<void>(
    {
      alias: "output",
    },
  );
  public readonly typeInput$: InputSignal<"reset" | "submit" | undefined>                                                  = input<"reset" | "submit" | undefined>(
    undefined,
    {
      alias: "type",
    },
  );
  public readonly urlInput$: InputSignal<string | undefined>                                                               = input<string | undefined>(
    undefined,
    {
      alias: "url",
    },
  );

}
