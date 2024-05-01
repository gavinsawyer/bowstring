import { DatePipe }              from "@angular/common";
import { Component }             from "@angular/core";
import { ArticleComponent }      from "../../../article/ArticleComponent";
import { CapsuleComponent }      from "../../../capsule/CapsuleComponent";
import { FlexboxComponent }      from "../../../flexbox/FlexboxComponent";
import { HeaderComponent }       from "../../../header/HeaderComponent";
import { HeadingGroupComponent } from "../../../heading group/HeadingGroupComponent";
import { LinkComponent }         from "../../../link/LinkComponent";
import { ListItemComponent }     from "../../../list item/ListItemComponent";
import { ListComponent }         from "../../../list/ListComponent";
import { RouteComponent }        from "../../../route/RouteComponent";
import { SectionComponent }      from "../../../section/SectionComponent";


@Component({
  imports:     [
    ArticleComponent,
    CapsuleComponent,
    DatePipe,
    FlexboxComponent,
    HeaderComponent,
    HeadingGroupComponent,
    LinkComponent,
    ListComponent,
    ListItemComponent,
    SectionComponent,
  ],
  standalone:  true,
  templateUrl: "PrivacyRouteComponent.html",
})
export class PrivacyRouteComponent extends RouteComponent {

  protected readonly now: Date = new Date();

}
