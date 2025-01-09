import { ChangeDetectionStrategy, Component, inject }                                                                                                                                                                                                  from "@angular/core";
import { GetRegionDisplayNamePipe }                                                                                                                                                                                                                    from "@standard/pipes";
import { AccountService }                                                                                                                                                                                                                              from "@standard/services";
import { AddressStripeElementComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, LabelComponent, PaymentStripeElementComponent, SectionComponent, SheetComponent, SymbolComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                                                                                                                                                                                                                  from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    styleUrls:   [
      "PaymentAndShippingAccountChildRouteComponent.sass",
    ],
    templateUrl: "PaymentAndShippingAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class PaymentAndShippingAccountChildRouteComponent
  extends AccountChildRouteComponent {

  protected readonly accountService: AccountService = inject<AccountService>(AccountService);

}
