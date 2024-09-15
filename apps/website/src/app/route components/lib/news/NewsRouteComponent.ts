import { DOCUMENT }                                                                                                                                                                 from "@angular/common";
import { Component, inject, signal, WritableSignal }                                                                                                                                from "@angular/core";
import { ArticleComponent, AsideComponent, CardComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, RouteComponent, ScrollStackComponent } from "@standard/components";
import { ScrollStackItemDirective }                                                                                                                                                 from "@standard/directives";
import { ORIGIN }                                                                                                                                                                   from "@standard/injection-tokens";


@Component(
  {
    imports:     [
      ArticleComponent,
      AsideComponent,
      CardComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      ScrollStackComponent,
      ScrollStackItemDirective,
    ],
    standalone:  true,
    styleUrls:   [
      "NewsRouteComponent.sass",
    ],
    templateUrl: "NewsRouteComponent.html",
  },
)
export class NewsRouteComponent
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
        "/assets/photos/1.jpeg",
        this.origin || this.document.location.origin,
      ),
      new URL(
        "/assets/photos/2.jpeg",
        this.origin || this.document.location.origin,
      ),
      new URL(
        "/assets/photos/3.jpeg",
        this.origin || this.document.location.origin,
      ),
    ],
  );

}
