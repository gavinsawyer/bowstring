import { DatePipe }                                                                   from "@angular/common";
import { Component }                                                                  from "@angular/core";
import { ListItemDirective }                                                          from "@standard/directives";
import { ArticleComponent, CapsuleComponent, HeaderComponent, HeadingGroupComponent } from "../../../content";
import { FlexboxContainerComponent, LabelComponent, ListComponent, SectionComponent } from "../../../layout and organization";
import { LinkComponent }                                                              from "../../../menus and actions";
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
