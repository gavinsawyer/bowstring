import { ChangeDetectionStrategy, Component, inject }                                                                                                                                                                                                           from "@angular/core";
import { RouterOutlet }                                                                                                                                                                                                                                         from "@angular/router";
import { AccountService, AuthenticationService }                                                                                                                                                                                                                from "@standard/services";
import { AsideComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LabelComponent, LinkComponent, RouteComponent, SectionComponent, SheetComponent, SymbolComponent } from "../../../../";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
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
    styleUrls:       [
      "AccountRouteComponent.sass",
    ],
    templateUrl:     "AccountRouteComponent.html",

    standalone: true,
  },
)
export class AccountRouteComponent
  extends RouteComponent {

  protected readonly accountService: AccountService               = inject<AccountService>(AccountService);
  protected readonly authenticationService: AuthenticationService = inject<AuthenticationService>(AuthenticationService);

}
