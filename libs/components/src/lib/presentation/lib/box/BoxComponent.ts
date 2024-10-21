import { NgTemplateOutlet }                                                               from "@angular/common";
import { afterRender, Component, type ElementRef, inject, type Signal, viewChild }        from "@angular/core";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, RoundedDirective } from "@standard/directives";


@Component(
  {
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
        directive: RoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--box",
    standalone:     true,
    styleUrls:      [
      "BoxComponent.sass",
    ],
    templateUrl:    "BoxComponent.html",
  },
)
export class BoxComponent {

  constructor() {
    afterRender(
      (): void => this.roundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly roundedDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

}
