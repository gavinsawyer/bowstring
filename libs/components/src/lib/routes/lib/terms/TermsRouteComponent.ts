import { DatePipe }                                                                                                                                                from "@angular/common";
import { ChangeDetectionStrategy, Component }                                                                                                                      from "@angular/core";
import { ArticleComponent, CapsuleComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, RouteComponent, SectionComponent } from "../../../../";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ArticleComponent,
      CapsuleComponent,
      DatePipe,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      LabelComponent,
      SectionComponent,
    ],
    styleUrl:        "TermsRouteComponent.sass",
    templateUrl:     "TermsRouteComponent.html",

    standalone: true,
  },
)
export class TermsRouteComponent
  extends RouteComponent {

  protected readonly now: Date = new Date();

}
