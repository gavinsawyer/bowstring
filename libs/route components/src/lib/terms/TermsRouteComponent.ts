import { DatePipe }                                                                                                                                from "@angular/common";
import { Component }                                                                                                                               from "@angular/core";
import { ArticleComponent, CapsuleComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, RouteComponent, SectionComponent } from "@standard/components";


@Component(
  {
    imports:     [
      ArticleComponent,
      CapsuleComponent,
      DatePipe,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      SectionComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "TermsRouteComponent.sass",
    ],
    templateUrl: "TermsRouteComponent.html",
  },
)
export class TermsRouteComponent extends RouteComponent {

  protected readonly now: Date = new Date();

}
