import { ChangeDetectionStrategy, Component, signal, type WritableSignal }                                                                                                                           from "@angular/core";
import { ArticleComponent, AsideComponent, BoxComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, RouteComponent, ScrollStackComponent, SectionComponent } from "@bowstring/components";
import { ScrollStackItemDirective }                                                                                                                                                                  from "@bowstring/directives";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ArticleComponent,
      AsideComponent,
      BoxComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      ScrollStackComponent,
      ScrollStackItemDirective,
      SectionComponent,
    ],
    styleUrl:        "DesignRouteComponent.sass",
    templateUrl:     "DesignRouteComponent.html",

    standalone: true,
  },
)
export class DesignRouteComponent
  extends RouteComponent {

  protected readonly imageSources$: WritableSignal<string[]> = signal<string[]>(
    [
      "/assets/photos/1.webp",
      "/assets/photos/2.webp",
      "/assets/photos/3.webp",
    ],
  );

}
