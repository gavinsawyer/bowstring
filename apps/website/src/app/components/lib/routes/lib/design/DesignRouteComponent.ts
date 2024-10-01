import { DOCUMENT }                                                                                                                                                                from "@angular/common";
import { Component, inject, signal, type WritableSignal }                                                                                                                          from "@angular/core";
import { ArticleComponent, AsideComponent, BoxComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, RouteComponent, ScrollStackComponent } from "@standard/components";
import { ScrollStackItemDirective }                                                                                                                                                from "@standard/directives";
import { ORIGIN }                                                                                                                                                                  from "@standard/injection-tokens";


@Component(
  {
    imports:     [
      ArticleComponent,
      AsideComponent,
      BoxComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      ScrollStackComponent,
      ScrollStackItemDirective,
    ],
    standalone:  true,
    styleUrls:   [
      "DesignRouteComponent.sass",
    ],
    templateUrl: "DesignRouteComponent.html",
  },
)
export class DesignRouteComponent
  extends RouteComponent {

  private readonly document: Document = inject<Document>(DOCUMENT);
  private readonly origin: URL | null = inject<URL>(
    ORIGIN,
    {
      optional: true,
    },
  );

  protected readonly imageUrls$: WritableSignal<URL[]> = signal<URL[]>(
    [
      new URL(
        "/assets/photos/1.webp",
        this.origin || this.document.location.origin,
      ),
      new URL(
        "/assets/photos/2.webp",
        this.origin || this.document.location.origin,
      ),
      new URL(
        "/assets/photos/3.webp",
        this.origin || this.document.location.origin,
      ),
    ],
  );

}
