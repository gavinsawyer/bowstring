import { DatePipe }                                                                   from "@angular/common";
import { Component }                                                                  from "@angular/core";
import { ArticleComponent, CapsuleComponent, HeaderComponent, HeadingGroupComponent } from "../../../content";
import { FlexboxContainerComponent, LabelComponent, SectionComponent }                from "../../../layout and organization";
import { RouteComponent }                                                             from "../../../navigation and search";


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
