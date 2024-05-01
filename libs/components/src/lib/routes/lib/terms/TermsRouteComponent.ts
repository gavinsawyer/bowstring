import { DatePipe }              from "@angular/common";
import { Component }             from "@angular/core";
import { ArticleComponent }      from "../../../article/ArticleComponent";
import { CapsuleComponent }      from "../../../capsule/CapsuleComponent";
import { FlexboxComponent }      from "../../../flexbox/FlexboxComponent";
import { HeaderComponent }       from "../../../header/HeaderComponent";
import { HeadingGroupComponent } from "../../../heading group/HeadingGroupComponent";
import { RouteComponent }        from "../../../route/RouteComponent";
import { SectionComponent }      from "../../../section/SectionComponent";


@Component({
  imports: [
    ArticleComponent,
    CapsuleComponent,
    DatePipe,
    FlexboxComponent,
    HeaderComponent,
    HeadingGroupComponent,
    SectionComponent,
  ],
  standalone:  true,
  templateUrl: "TermsRouteComponent.html",
})
export class TermsRouteComponent extends RouteComponent {

  protected readonly now: Date = new Date();

}
