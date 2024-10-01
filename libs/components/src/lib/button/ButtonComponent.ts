import { NgTemplateOutlet }                                                                                                                                                                             from "@angular/common";
import { booleanAttribute, Component, effect, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, output, type OutputEmitterRef, type Signal, viewChild } from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                                                                                                                 from "@angular/router";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, HoverTransformingDirective, RoundedDirective }                                                                                   from "@standard/directives";


@Component(
  {
    host:           {
      "[class.appearance-raised]": "appearanceInput$() === 'raised'",
      "[class.appearance-symbol]": "appearanceInput$() === 'symbol'",
      "[class.disabled]":          "disabledInput$() || routerLinkActive$()?.isActive || false",
    },
    hostDirectives: [
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
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
        directive: HoverTransformingDirective,
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "level",
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
          this.htmlDivElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly hoverTranslatingDirective: HoverTransformingDirective                 = inject<HoverTransformingDirective>(HoverTransformingDirective);
  private readonly htmlAnchorElementRef$: Signal<ElementRef<HTMLDivElement> | undefined> = viewChild<ElementRef<HTMLDivElement>>("htmlAnchorElement");
  private readonly htmlButtonElementRef$: Signal<ElementRef<HTMLDivElement> | undefined> = viewChild<ElementRef<HTMLDivElement>>("htmlButtonElement");
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement> | undefined>    = viewChild<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly roundedContainerDirective: RoundedDirective             = inject<RoundedDirective>(RoundedDirective);
  protected readonly routerLinkActive$: Signal<RouterLinkActive | undefined> = viewChild<RouterLinkActive>(RouterLinkActive);

  public readonly appearanceInput$: InputSignal<"raised" | "symbol" | undefined>                               = input<"raised" | "symbol" | undefined>(
    undefined,
    {
      alias: "appearance",
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
