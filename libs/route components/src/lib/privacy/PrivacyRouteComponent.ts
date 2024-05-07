import { DatePipe }                                                                                                                                                                        from "@angular/common";
import { Component }                                                                                                                                                                       from "@angular/core";
import { ArticleComponent, CapsuleComponent, FlexboxComponent, HeaderComponent, HeadingGroupComponent, LinkComponent, ListComponent, ListItemComponent, RouteComponent, SectionComponent } from "@standard/components";


@Component({
  imports:        [
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
  standalone:     true,
  templateUrl:    "PrivacyRouteComponent.html",
})
export class PrivacyRouteComponent extends RouteComponent {

  protected readonly now: Date = new Date();

}
