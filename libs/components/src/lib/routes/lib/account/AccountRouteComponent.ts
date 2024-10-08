import { Component, inject }                                                                                                                                                                                        from "@angular/core";
import { RouterOutlet }                                                                                                                                                                                             from "@angular/router";
import { AuthenticationService, ProfileService }                                                                                                                                                                    from "@standard/services";
import { AsideComponent, BoxComponent, ButtonComponent, FlexboxContainerComponent, GridContainerComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, RouteComponent, SymbolComponent } from "../../../../";


@Component(
  {
    imports:     [
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
