import { DatePipe }                                  from "@angular/common";
import { Component }                                 from "@angular/core";
import { ListItemDirective }                         from "@standard/directives";
import { ArticleComponent }                          from "../../../article/ArticleComponent";
import { CapsuleComponent }                          from "../../../capsule/CapsuleComponent";
import { HeaderComponent }                           from "../../../header/HeaderComponent";
import { HeadingGroupComponent }                     from "../../../heading group/HeadingGroupComponent";
import { FlexboxContainerComponent, LabelComponent } from "../../../layout and organization";
import { LinkComponent }                             from "../../../link/LinkComponent";
import { ListComponent }                             from "../../../list/ListComponent";
import { RouteComponent }                            from "../../../route/RouteComponent";
import { SectionComponent }                          from "../../../section/SectionComponent";


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
      LinkComponent,
      ListComponent,
      ListItemDirective,
      SectionComponent,
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
