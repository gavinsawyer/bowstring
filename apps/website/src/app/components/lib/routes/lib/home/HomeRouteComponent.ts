import { ChangeDetectionStrategy, Component, signal, type WritableSignal }                                                                                                                           from "@angular/core";
import { ArticleComponent, AsideComponent, BoxComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, RouteComponent, ScrollStackComponent, SectionComponent } from "@standard/components";
import { ScrollStackItemDirective }                                                                                                                                                                  from "@standard/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      BoxComponent,
      ArticleComponent,
      AsideComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      ScrollStackComponent,
      ScrollStackItemDirective,
      SectionComponent,
    ],
    styleUrls:       [
      "HomeRouteComponent.sass",
    ],
    templateUrl:     "HomeRouteComponent.html",

    standalone: true,
  },
)
export class HomeRouteComponent
  extends RouteComponent {

  protected readonly imageSources$: WritableSignal<string[]> = signal<string[]>(
    [
      "/assets/photos/1.webp",
      "/assets/photos/2.webp",
      "/assets/photos/3.webp",
    ],
  );

}
