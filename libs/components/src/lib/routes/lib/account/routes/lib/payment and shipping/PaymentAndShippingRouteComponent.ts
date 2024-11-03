import { Component, inject }                                                                                                                                                                                                                                                                   from "@angular/core";
import { GetRegionDisplayNamePipe }                                                                                                                                                                                                                                                            from "@standard/pipes";
import { AccountService }                                                                                                                                                                                                                                                                      from "@standard/services";
import { AddressStripeElementComponent, BoxComponent, ButtonComponent, ComboboxInputComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, LabelComponent, PaymentStripeElementComponent, RouteComponent, SectionComponent, SheetComponent, SymbolComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      AddressStripeElementComponent,
      BoxComponent,
      ButtonComponent,
      ComboboxInputComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      GetRegionDisplayNamePipe,
      HeaderComponent,
      LabelComponent,
      PaymentStripeElementComponent,
      SectionComponent,
      SheetComponent,
      SymbolComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "PaymentAndShippingRouteComponent.sass",
    ],
    templateUrl: "PaymentAndShippingRouteComponent.html",
  },
)
export class PaymentAndShippingRouteComponent
  extends RouteComponent {

  protected readonly accountService: AccountService = inject<AccountService>(AccountService);

}
