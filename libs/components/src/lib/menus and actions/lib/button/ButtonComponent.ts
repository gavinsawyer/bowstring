import { NgTemplateOutlet }                                                                                                                                                                 from "@angular/common";
import { afterRender, booleanAttribute, Component, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, output, type OutputEmitterRef, type Signal, viewChild } from "@angular/core";
import { RouterLink, RouterLinkActive }                                                                                                                                                     from "@angular/router";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, GlassDirective, HoverTransformingDirective, InverseDirective, PrimaryDirective, RoundedDirective }                  from "@standard/directives";


@Component(
  {
    host:           {
      "[class.appearance-raised]": "appearanceInput$() === 'raised'",
      "[class.appearance-symbol]": "appearanceInput$() === 'symbol'",
      "[class.disabled]":          "disabledInput$() || routerLinkActive$()?.isActive || false",
      "[class.material-glass]":    "materialInput$() === 'glass'",
      "[class.material-inverse]":  "materialInput$() === 'inverse'",
      "[class.material-primary]":  "materialInput$() === 'primary'",
    },
    hostDirectives: [
      {
        directive: CanvasDirective,
      },
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
        directive: InverseDirective,
      },
      {
        directive: PrimaryDirective,
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
    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlAnchorElementRef$() || this.htmlButtonElementRef$());
        this.roundedContainerDirective.htmlElementRef$.set(this.htmlAnchorElementRef$() || this.htmlButtonElementRef$());
      },
    );
  }

  private readonly hoverTransformingDirective: HoverTransformingDirective                   = inject<HoverTransformingDirective>(HoverTransformingDirective);
  private readonly htmlAnchorElementRef$: Signal<ElementRef<HTMLAnchorElement> | undefined> = viewChild<ElementRef<HTMLAnchorElement>>("htmlAnchorElement");
  private readonly htmlButtonElementRef$: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>("htmlButtonElement");

  protected readonly roundedContainerDirective: RoundedDirective             = inject<RoundedDirective>(RoundedDirective);
  protected readonly routerLinkActive$: Signal<RouterLinkActive | undefined> = viewChild<RouterLinkActive>(RouterLinkActive);

  public readonly appearanceInput$: InputSignal<"raised" | "symbol" | undefined>                                           = input<"raised" | "symbol" | undefined>(
    undefined,
    {
      alias: "appearance",
    },
  );
  public readonly disabledInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "disabled",
      transform: booleanAttribute,
    },
  );
  public readonly materialInput$: InputSignal<"glass" | "inverse" | "primary" | undefined>                                 = input<"glass" | "inverse" | "primary" | undefined>(
    undefined,
    {
      alias: "material",
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
