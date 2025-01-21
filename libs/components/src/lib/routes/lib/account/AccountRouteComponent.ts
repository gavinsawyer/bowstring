import { ChangeDetectionStrategy, Component, inject, InjectionToken }                                                                                                                                                                                           from "@angular/core";
import { RouterOutlet, type Routes }                                                                                                                                                                                                                            from "@angular/router";
import { FindRouteByPathPipe }                                                                                                                                                                                                                                  from "@standard/pipes";
import { AccountService, AuthenticationService }                                                                                                                                                                                                                from "@standard/services";
import { AsideComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LabelComponent, LinkComponent, RouteComponent, SectionComponent, SheetComponent, SymbolComponent } from "../../../../";
import { accountRoutes }                                                                                                                                                                                                                                        from "./children";


const ACCOUNT_ROUTES: InjectionToken<Routes> = new InjectionToken<Routes>("ACCOUNT_ROUTES");

@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      AsideComponent,
      BoxComponent,
      ButtonComponent,
      DividerComponent,
      FindRouteByPathPipe,
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
    providers:       [
      {
        provide:  ACCOUNT_ROUTES,
        useValue: accountRoutes,
      },
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

  protected readonly accountRoutes: Routes                        = inject<Routes>(ACCOUNT_ROUTES);
  protected readonly accountService: AccountService               = inject<AccountService>(AccountService);
  protected readonly authenticationService: AuthenticationService = inject<AuthenticationService>(AuthenticationService);

}
