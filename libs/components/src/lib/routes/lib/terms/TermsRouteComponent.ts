import { DatePipe }                  from "@angular/common";
import { Component }                 from "@angular/core";
import { ArticleComponent }          from "../../../article/ArticleComponent";
import { CapsuleComponent }          from "../../../capsule/CapsuleComponent";
import { HeaderComponent }           from "../../../header/HeaderComponent";
import { HeadingGroupComponent }     from "../../../heading group/HeadingGroupComponent";
import { FlexboxContainerComponent } from "../../../layout and organization";
import { RouteComponent }            from "../../../route/RouteComponent";
import { SectionComponent }          from "../../../section/SectionComponent";


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
export class TermsRouteComponent
  extends RouteComponent {

  protected readonly now: Date = new Date();

}
