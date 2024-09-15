import { NgComponentOutlet, NgTemplateOutlet }                                                                                                                                       from "@angular/common";
import { booleanAttribute, Component, effect, ElementRef, inject, input, InputSignal, InputSignalWithTransform, numberAttribute, output, OutputEmitterRef, Signal, viewChild }       from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                                                                                              from "@angular/router";
import { ElevatedContainerDirective, FlexboxContainerDirective, GlassContainerDirective, HoverTranslatingContainerDirective, RoundedContainerDirective, SymbolPathsLoaderDirective } from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ElevatedContainerDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "collapsable",
          "columnGap",
          "flexDirection",
          "flexWrap",
          "justifyContent",
          "listenToScrollEvent",
          "rowGap",
        ],
      },
      {
        directive: GlassContainerDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: HoverTranslatingContainerDirective,
      },
      {
        directive: RoundedContainerDirective,
        inputs:    [
          "borderRadiusFactor",
        ],
      },
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
        this.flexboxContainerDirective.htmlElementRef$.set(
          this.htmlAnchorElementRef$() || this.htmlButtonElementRef$(),
        );
        this.hoverTranslatingContainerDirective.htmlElementRef$.set(
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

  private readonly flexboxContainerDirective: FlexboxContainerDirective                     = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly hoverTranslatingContainerDirective: HoverTranslatingContainerDirective   = inject<HoverTranslatingContainerDirective>(HoverTranslatingContainerDirective);
  private readonly htmlAnchorElementRef$: Signal<ElementRef<HTMLAnchorElement> | undefined> = viewChild<ElementRef<HTMLAnchorElement>>("htmlAnchorElement");
  private readonly htmlButtonElementRef$: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>("htmlButtonElement");

  protected readonly roundedContainerDirective: RoundedContainerDirective                     = inject<RoundedContainerDirective>(RoundedContainerDirective);
  protected readonly symbolPathsLoaderDirective: SymbolPathsLoaderDirective = inject<SymbolPathsLoaderDirective>(SymbolPathsLoaderDirective);

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
  public readonly textInput$: InputSignal<string | undefined>                                                  = input<string | undefined>(
    undefined,
    {
      alias: "text",
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
