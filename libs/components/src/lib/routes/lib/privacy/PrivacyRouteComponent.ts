import { DatePipe }                                                                                                                                                                              from "@angular/common";
import { ChangeDetectionStrategy, Component }                                                                                                                                                    from "@angular/core";
import { ListItemDirective }                                                                                                                                                                     from "@standard/directives";
import { ArticleComponent, CapsuleComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, ListComponent, RouteComponent, SectionComponent } from "../../../../";


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
      LinkComponent,
      ListComponent,
      ListItemDirective,
      SectionComponent,
    ],
    styleUrls:       [
      "PrivacyRouteComponent.sass",
    ],
    templateUrl:     "PrivacyRouteComponent.html",

    standalone: true,
  },
)
export class PrivacyRouteComponent
  extends RouteComponent {

  protected readonly now: Date = new Date();

}
