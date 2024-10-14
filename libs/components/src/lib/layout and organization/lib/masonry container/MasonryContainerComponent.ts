import { NgTemplateOutlet }                                                        from "@angular/common";
import { afterRender, Component, type ElementRef, inject, type Signal, viewChild } from "@angular/core";
import { MasonryContainerDirective }                                               from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: MasonryContainerDirective,
        inputs:    [
          "columns",
          "gapColumn",
          "gapRow",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--masonry-container",
    standalone:     true,
    styleUrls:      [
      "MasonryContainerComponent.sass",
    ],
    templateUrl:    "MasonryContainerComponent.html",
  },
)
export class MasonryContainerComponent {

  constructor() {
    afterRender(
      (): void => {
        this.masonryContainerDirective.columnSizerHtmlDivElementRef$.set(this.columnSizerHtmlDivElementRef$());
        this.masonryContainerDirective.gutterSizerHtmlDivElementRef$.set(this.gutterSizerHtmlDivElementRef$());
        this.masonryContainerDirective.innerHtmlDivElementRef$.set(this.innerHtmlDivElementRef$());
      },
    );
  }

  private readonly columnSizerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("columnSizerHtmlDivElement");
  private readonly gutterSizerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>("gutterSizerHtmlDivElement");
  private readonly innerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>       = viewChild.required<ElementRef<HTMLDivElement>>("innerHtmlDivElement");
  private readonly masonryContainerDirective: MasonryContainerDirective              = inject<MasonryContainerDirective>(MasonryContainerDirective);

}
