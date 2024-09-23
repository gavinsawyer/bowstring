import { DatePipe }                                                                                                                                                              from "@angular/common";
import { Component }                                                                                                                                                                            from "@angular/core";
import { ArticleComponent, CapsuleComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, LinkComponent, ListComponent, RouteComponent, SectionComponent, TextComponent } from "@standard/components";
import { ListItemDirective }                                                                                                                                                                    from "@standard/directives";


@Component(
  {
    imports: [
      ArticleComponent,
      CapsuleComponent,
      DatePipe,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      LinkComponent,
      ListComponent,
      ListItemDirective,
      SectionComponent,
      TextComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "PrivacyRouteComponent.sass",
    ],
    templateUrl: "PrivacyRouteComponent.html",
  },
)
export class PrivacyRouteComponent
  extends RouteComponent {

  protected readonly now: Date = new Date();

}
