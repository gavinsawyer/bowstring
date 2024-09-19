import { NgComponentOutlet, NgTemplateOutlet }                                                                                                                                 from "@angular/common";
import { booleanAttribute, Component, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, output, type OutputEmitterRef, type Signal, viewChild } from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                                                                                        from "@angular/router";
import { SymbolPathsLoaderDirective }                                                                                                                                          from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: SymbolPathsLoaderDirective,
        inputs:    [
          "symbolName",
        ],
      },
    ],
    imports:        [
      NgComponentOutlet,
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
  protected readonly symbolPathsLoaderDirective: SymbolPathsLoaderDirective  = inject<SymbolPathsLoaderDirective>(SymbolPathsLoaderDirective);

  public readonly disabledInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`> = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "disabled",
      transform: booleanAttribute,
    },
  );
  public readonly selectOutput: OutputEmitterRef<void>                                                         = output<void>(
    {
      alias: "select",
    },
  );
  public readonly tabIndexOverrideInput$: InputSignalWithTransform<number | undefined, number | `${ number }`> = input<number | undefined, number | `${ number }`>(
    undefined,
    {
      alias:     "tabIndexOverride",
      transform: numberAttribute,
    },
  );
  public readonly textInput$: InputSignal<string | undefined>                                                  = input<string | undefined>(
    undefined,
    {
      alias: "text",
    },
  );
  public readonly urlInput$: InputSignal<string | undefined>                                                   = input<string | undefined>(
    undefined,
    {
      alias: "url",
    },
  );

}
