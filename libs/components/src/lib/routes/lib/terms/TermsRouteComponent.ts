import { DatePipe }                                                                                                                                                from "@angular/common";
import { Component }                                                                                                                                               from "@angular/core";
import { ArticleComponent, CapsuleComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, RouteComponent, SectionComponent } from "../../../../";


@Component(
  {
    imports:     [
      ArticleComponent,
      CapsuleComponent,
      DatePipe,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      LabelComponent,
      SectionComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "TermsRouteComponent.sass",
    ],
    templateUrl: "TermsRouteComponent.html",
  },
)
export class TermsRouteComponent
  extends RouteComponent {

  protected readonly now: Date = new Date();

}
