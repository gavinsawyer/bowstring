import { ChangeDetectionStrategy, Component, inject }                                                                                                                                                                                                  from "@angular/core";
import { GetRegionDisplayNamePipe }                                                                                                                                                                                                                    from "@standard/pipes";
import { AccountService }                                                                                                                                                                                                                              from "@standard/services";
import { AddressStripeElementComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, LabelComponent, PaymentStripeElementComponent, SectionComponent, SheetComponent, SymbolComponent } from "../../../../../../../";
import { ChildRouteComponent }                                                                                                                                                                                                                         from "../../../child route/ChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
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
    styleUrls:       [
      "PaymentAndShippingChildRouteComponent.sass",
    ],
    templateUrl:     "PaymentAndShippingChildRouteComponent.html",

    standalone: true,
  },
)
export class PaymentAndShippingChildRouteComponent
  extends ChildRouteComponent {

  protected readonly accountService: AccountService = inject<AccountService>(AccountService);

}
