import { Component, inject }                                                                                                                                                                                                                                          from "@angular/core";
import { RouterOutlet }                                                                                                                                                                                                                                               from "@angular/router";
import { AuthenticationService, ProfileService }                                                                                                                                                                                                                      from "@standard/services";
import { AsideComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, GridContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LabelComponent, LinkComponent, RouteComponent, SheetComponent, SymbolComponent } from "../../../../";


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
      LabelComponent,
      LinkComponent,
      RouterOutlet,
      SheetComponent,
      SymbolComponent,
      ImageComponent,
      DividerComponent,
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
