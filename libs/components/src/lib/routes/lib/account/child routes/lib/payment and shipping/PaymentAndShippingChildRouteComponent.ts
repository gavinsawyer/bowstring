import { Component, inject }                                                                                                                                                                                                                           from "@angular/core";
import { GetRegionDisplayNamePipe }                                                                                                                                                                                                                    from "@standard/pipes";
import { AccountService }                                                                                                                                                                                                                              from "@standard/services";
import { AddressStripeElementComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, LabelComponent, PaymentStripeElementComponent, SectionComponent, SheetComponent, SymbolComponent } from "../../../../../../../";
import { ChildRouteComponent }                                                                                                                                                                                                                         from "../../../child route/ChildRouteComponent";


@Component(
  {
    imports:     [
      AddressStripeElementComponent,
      BoxComponent,
      ButtonComponent,
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
      "PaymentAndShippingChildRouteComponent.sass",
    ],
    templateUrl: "PaymentAndShippingChildRouteComponent.html",
  },
)
export class PaymentAndShippingChildRouteComponent
  extends ChildRouteComponent {

  protected readonly accountService: AccountService = inject<AccountService>(AccountService);

}
