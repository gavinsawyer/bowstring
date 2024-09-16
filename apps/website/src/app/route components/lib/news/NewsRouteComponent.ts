import { Component, signal, type WritableSignal }                                                                                                                                   from "@angular/core";
import { ArticleComponent, AsideComponent, CardComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, RouteComponent, ScrollStackComponent } from "@standard/components";
import { ScrollStackItemDirective }                                                                                                                                                 from "@standard/directives";


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

  protected readonly imageSources$: WritableSignal<string[]> = signal<string[]>(
    [
      "/assets/photos/1.jpeg",
      "/assets/photos/2.jpeg",
      "/assets/photos/3.jpeg",
    ],
  );

}
