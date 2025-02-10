import { NgTemplateOutlet }                                                                                                               from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, contentChildren, type ElementRef, inject, type Signal, TemplateRef, viewChild } from "@angular/core";
import { MasonryChildDirective, MasonryContainerDirective }                                                                               from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: MasonryContainerDirective,
        inputs:    [
          "columns",
          "gapColumn",
          "gapRow",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "standard--masonry-container",
    styleUrl:        "MasonryContainerComponent.sass",
    templateUrl:     "MasonryContainerComponent.html",

    standalone: true,
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

  protected readonly childTemplateRefs$: Signal<readonly TemplateRef<MasonryChildDirective>[]> = contentChildren<MasonryChildDirective, TemplateRef<MasonryChildDirective>>(
    MasonryChildDirective,
    {
      read: TemplateRef,
    },
  );
  private readonly columnSizerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>           = viewChild.required<ElementRef<HTMLDivElement>>("columnSizerHtmlDivElement");
  private readonly gutterSizerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>           = viewChild.required<ElementRef<HTMLDivElement>>("gutterSizerHtmlDivElement");
  private readonly innerHtmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>                 = viewChild.required<ElementRef<HTMLDivElement>>("innerHtmlDivElement");
  private readonly masonryContainerDirective: MasonryContainerDirective                        = inject<MasonryContainerDirective>(MasonryContainerDirective);

}
