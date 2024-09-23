import { NgTemplateOutlet }                                                                                                                                                                             from "@angular/common";
import { booleanAttribute, Component, effect, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, output, type OutputEmitterRef, type Signal, viewChild } from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                                                                                                                 from "@angular/router";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, HoverTranslatingDirective, RoundedDirective }                                                                                    from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ElevatedDirective,
        inputs:    [
          "materialOpacity",
        ],
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
        directive: GlassDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: HoverTranslatingDirective,
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "roundnessFactor",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
      RouterLink,
      RouterLinkActive,
    ],
    selector:       "standard--button",
    standalone:     true,
    styleUrls:      [
      "ButtonComponent.sass",
    ],
    templateUrl:    "ButtonComponent.html",
  },
)
export class ButtonComponent {

  constructor() {
    effect(
      (): void => {
        this.hoverTranslatingDirective.htmlElementRef$.set(
          this.htmlAnchorElementRef$() || this.htmlButtonElementRef$(),
        );
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlAnchorElementRef$() || this.htmlButtonElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly hoverTranslatingDirective: HoverTranslatingDirective                     = inject<HoverTranslatingDirective>(HoverTranslatingDirective);
  private readonly htmlAnchorElementRef$: Signal<ElementRef<HTMLAnchorElement> | undefined> = viewChild<ElementRef<HTMLAnchorElement>>("htmlAnchorElement");
  private readonly htmlButtonElementRef$: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>("htmlButtonElement");

  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

  public readonly appearanceInput$: InputSignal<"flat" | "raised" | "symbol" | undefined>                      = input<"flat" | "raised" | "symbol" | undefined>(
    undefined,
    {
      alias: "appearance",
    },
  );
  public readonly colorInput$: InputSignal<"primary" | "none" | undefined>                                     = input<"primary" | "none" | undefined>(
    undefined,
    {
      alias: "color",
    },
  );
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
  public readonly typeInput$: InputSignal<"button" | "reset" | "submit" | undefined>                           = input<"button" | "reset" | "submit" | undefined>(
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
