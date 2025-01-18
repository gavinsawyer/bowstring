import { ChangeDetectionStrategy, Component, inject }                                                                                                                                                                                                                                                          from "@angular/core";
import { Auth }                                                                                                                                                                                                                                                                                                from "@angular/fire/auth";
import { doc, type DocumentData, type DocumentReference, Firestore, updateDoc }                                                                                                                                                                                                                                from "@angular/fire/firestore";
import { Functions, httpsCallable }                                                                                                                                                                                                                                                                            from "@angular/fire/functions";
import { type AccountDocument }                                                                                                                                                                                                                                                                                from "@standard/interfaces";
import { GetRegionDisplayNamePipe }                                                                                                                                                                                                                                                                            from "@standard/pipes";
import { AccountService }                                                                                                                                                                                                                                                                                      from "@standard/services";
import { AddressStripeElementComponent, BoxComponent, ButtonComponent, CaptionComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, PaymentStripeElementComponent, SectionComponent, SheetComponent, SymbolComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                                                                                                                                                                                                                                                                          from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      AddressStripeElementComponent,
      BoxComponent,
      ButtonComponent,
      CaptionComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      GetRegionDisplayNamePipe,
      HeaderComponent,
      HeadingGroupComponent,
      LabelComponent,
      LinkComponent,
      PaymentStripeElementComponent,
      SectionComponent,
      SheetComponent,
      SymbolComponent,
    ],
    styleUrls:       [
      "PaymentAndShippingAccountChildRouteComponent.sass",
    ],
    templateUrl:     "PaymentAndShippingAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class PaymentAndShippingAccountChildRouteComponent
  extends AccountChildRouteComponent {

  private readonly auth: Auth           = inject<Auth>(Auth);
  private readonly firestore: Firestore = inject<Firestore>(Firestore);
  private readonly functions: Functions = inject<Functions>(Functions);

  protected readonly accountService: AccountService = inject<AccountService>(AccountService);

  protected removeAddress(): void {
    const stripeCustomer: AccountDocument["stripeCustomer"] | undefined = this.accountService.accountDocument$()?.stripeCustomer;

    if (stripeCustomer && this.auth.currentUser)
      updateDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ this.auth.currentUser.uid }`,
        ) as DocumentReference<AccountDocument>,
        {
          stripeCustomer: {
            ...stripeCustomer,
            address: null,
            name:    null,
            phone:   null,
          },
        },
      ).then<void, never>(
        (): void => void (0),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
  protected removePaymentMethod(): void {
    httpsCallable<null, null>(
      this.functions,
      "detachStripePaymentMethod",
    )().then<void, never>(
      (): void => void (0),
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    );
  }

}
