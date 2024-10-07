import { Component, inject }                                        from "@angular/core";
import { ProfileService }                                           from "@standard/services";
import { ArticleComponent, HeaderComponent, HeadingGroupComponent } from "../../../content";
import { RouteComponent }                                           from "../../../navigation and search";


@Component(
  {
    imports:     [
      ArticleComponent,
      HeaderComponent,
      HeadingGroupComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "AccountRouteComponent.sass",
    ],
    templateUrl: "AccountRouteComponent.html",
  },
)
export class AccountRouteComponent
  extends RouteComponent {

  protected readonly profileService: ProfileService = inject<ProfileService>(ProfileService);

}
