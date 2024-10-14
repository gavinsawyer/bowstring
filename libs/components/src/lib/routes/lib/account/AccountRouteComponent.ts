import { Component, inject }                                                                                                                                                                                                                                    from "@angular/core";
import { RouterOutlet }                                                                                                                                                                                                                                         from "@angular/router";
import { AuthenticationService, ProfileService }                                                                                                                                                                                                                from "@standard/services";
import { AsideComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LabelComponent, LinkComponent, RouteComponent, SectionComponent, SheetComponent, SymbolComponent } from "../../../../";


@Component(
  {
    imports:     [
      AsideComponent,
      BoxComponent,
      ButtonComponent,
      DividerComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      LabelComponent,
      LinkComponent,
      RouterOutlet,
      SectionComponent,
      SheetComponent,
      SymbolComponent,
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
