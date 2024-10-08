import { Component, inject }                                       from "@angular/core";
import { RouterOutlet }                                            from "@angular/router";
import { AuthenticationService, ProfileService }                   from "@standard/services";
import { HeaderComponent, HeadingGroupComponent, SymbolComponent }           from "../../../content";
import { FlexboxContainerComponent, GridContainerComponent, LabelComponent } from "../../../layout and organization";
import { ButtonComponent, LinkComponent }                                    from "../../../menus and actions";
import { AsideComponent, RouteComponent }                          from "../../../navigation and search";
import { BoxComponent }                                            from "../../../presentation";


@Component(
  {
    imports: [
      AsideComponent,
      BoxComponent,
      ButtonComponent,
      FlexboxContainerComponent,
      GridContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      RouterOutlet,
      SymbolComponent,
      LinkComponent,
      LabelComponent,
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

  protected readonly authenticationService: AuthenticationService = inject<AuthenticationService>(AuthenticationService);
  protected readonly profileService: ProfileService               = inject<ProfileService>(ProfileService);

}
