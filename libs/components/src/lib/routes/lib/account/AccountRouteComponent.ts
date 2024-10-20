import { Component, inject }                                                                                                                                                                                                                                    from "@angular/core";
import { RouterOutlet }                                                                                                                                                                                                                                         from "@angular/router";
import { AuthenticationService, AccountService }                                                                                                                                                                                                                from "@standard/services";
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

  protected readonly accountService: AccountService               = inject<AccountService>(AccountService);
  protected readonly authenticationService: AuthenticationService = inject<AuthenticationService>(AuthenticationService);

}
