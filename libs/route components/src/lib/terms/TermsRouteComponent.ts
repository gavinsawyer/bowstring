import { DatePipe }                                                                                                                       from "@angular/common";
import { Component }                                                                                                                      from "@angular/core";
import { ArticleComponent, CapsuleComponent, FlexboxComponent, HeaderComponent, HeadingGroupComponent, RouteComponent, SectionComponent } from "@standard/components";


@Component({
  imports:        [
    ArticleComponent,
    CapsuleComponent,
    DatePipe,
    FlexboxComponent,
    HeaderComponent,
    HeadingGroupComponent,
    SectionComponent,
  ],
  standalone:     true,
  templateUrl:    "TermsRouteComponent.html",
})
export class TermsRouteComponent extends RouteComponent {

  protected readonly now: Date = new Date();

}
