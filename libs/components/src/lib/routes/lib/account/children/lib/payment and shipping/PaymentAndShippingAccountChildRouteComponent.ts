import { ChangeDetectionStrategy, Component, inject }                                                                                                                                                                                                                                                                                                                                     from "@angular/core";
import { Auth }                                                                                                                                                                                                                                                                                                                                                                           from "@angular/fire/auth";
import { collection, type CollectionReference, deleteField, Firestore, getDocs, query, type QueryDocumentSnapshot, type QuerySnapshot, serverTimestamp, where, writeBatch, type WriteBatch }                                                                                                                                                                                              from "@angular/fire/firestore";
import { ListItemDirective }                                                                                                                                                                                                                                                                                                                                                              from "@bowstring/directives";
import { type StripeCustomerDocument, type StripePaymentMethodDocument }                                                                                                                                                                                                                                                                                                                  from "@bowstring/interfaces";
import { GetRegionDisplayNamePipe }                                                                                                                                                                                                                                                                                                                                                       from "@bowstring/pipes";
import { AccountService, EllipsesService, StripeCustomersService, StripePaymentMethodsService }                                                                                                                                                                                                                                                                                           from "@bowstring/services";
import { AddressStripeElementComponent, BoxComponent, ButtonComponent, CaptionComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, ListComponent, PaymentStripeElementComponent, SectionComponent, SegmentedControlComponent, SegmentedControlOptionComponent, SheetComponent, SymbolComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                                                                                                                                                                                                                                                                                                                                                     from "../../../child/AccountChildRouteComponent";


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
      SegmentedControlComponent,
      SegmentedControlOptionComponent,
      SheetComponent,
      SymbolComponent,
      ListComponent,
      ListItemDirective,
    ],
    styleUrl:        "PaymentAndShippingAccountChildRouteComponent.sass",
    templateUrl:     "PaymentAndShippingAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class PaymentAndShippingAccountChildRouteComponent
  extends AccountChildRouteComponent {

  private readonly auth: Auth           = inject<Auth>(Auth);
  private readonly firestore: Firestore = inject<Firestore>(Firestore);

  protected readonly accountService: AccountService                           = inject<AccountService>(AccountService);
  protected readonly ellipsesService: EllipsesService                         = inject<EllipsesService>(EllipsesService);
  protected readonly stripeCustomersService: StripeCustomersService           = inject<StripeCustomersService>(StripeCustomersService);
  protected readonly stripePaymentMethodsService: StripePaymentMethodsService = inject<StripePaymentMethodsService>(StripePaymentMethodsService);

  protected makePaymentMethodDefault(id: string): void {
    const stripeCustomerDocumentsWriteBatch: WriteBatch = writeBatch(this.firestore);
    const userId: string | undefined                    = this.auth.currentUser?.uid;

    if (userId)
      getDocs<StripeCustomerDocument, StripeCustomerDocument>(
        query<StripeCustomerDocument, StripeCustomerDocument>(
          collection(
            this.firestore,
            "stripeCustomers",
          ) as CollectionReference<StripeCustomerDocument, StripeCustomerDocument>,
          where(
            "userId",
            "==",
            userId,
          ),
        ),
      ).then<void, never>(
        (stripeCustomerDocumentsQuerySnapshot: QuerySnapshot<StripeCustomerDocument, StripeCustomerDocument>): void => {
          stripeCustomerDocumentsQuerySnapshot.forEach(
            ({ ref: stripeCustomerDocumentReference }: QueryDocumentSnapshot<StripeCustomerDocument, StripeCustomerDocument>): void => stripeCustomerDocumentsWriteBatch.update<StripeCustomerDocument, StripeCustomerDocument>(
              stripeCustomerDocumentReference,
              {
                "invoiceSettings.defaultPaymentMethod": id,
              },
            ) && void (0),
          );

          stripeCustomerDocumentsWriteBatch.commit().catch<never>(
            (error: unknown): never => {
              console.error("Something went wrong.");

              throw error;
            },
          );
        },
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
  protected removeAddress(): void {
    const stripeCustomerDocumentsWriteBatch: WriteBatch = writeBatch(this.firestore);
    const userId: string | undefined                    = this.auth.currentUser?.uid;

    if (userId)
      getDocs<StripeCustomerDocument, StripeCustomerDocument>(
        query<StripeCustomerDocument, StripeCustomerDocument>(
          collection(
            this.firestore,
            "stripeCustomers",
          ) as CollectionReference<StripeCustomerDocument, StripeCustomerDocument>,
          where(
            "userId",
            "==",
            userId,
          ),
        ),
      ).then<void, never>(
        (stripeCustomerDocumentsQuerySnapshot: QuerySnapshot<StripeCustomerDocument, StripeCustomerDocument>): void => {
          stripeCustomerDocumentsQuerySnapshot.forEach(
            ({ ref: stripeCustomerDocumentReference }: QueryDocumentSnapshot<StripeCustomerDocument, StripeCustomerDocument>): void => stripeCustomerDocumentsWriteBatch.update<StripeCustomerDocument, StripeCustomerDocument>(
              stripeCustomerDocumentReference,
              {
                shipping: deleteField(),
              },
            ) && void (0),
          );

          stripeCustomerDocumentsWriteBatch.commit().catch<never>(
            (error: unknown): never => {
              console.error("Something went wrong.");

              throw error;
            },
          );
        },
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
  protected removeStripePaymentMethod(id: string): void {
    const stripePaymentMethodDocumentsWriteBatch: WriteBatch = writeBatch(this.firestore);
    const userId: string | undefined                         = this.auth.currentUser?.uid;

    if (userId)
      getDocs<StripePaymentMethodDocument, StripePaymentMethodDocument>(
        query<StripePaymentMethodDocument, StripePaymentMethodDocument>(
          collection(
            this.firestore,
            "stripePaymentMethods",
          ) as CollectionReference<StripePaymentMethodDocument, StripePaymentMethodDocument>,
          where(
            "userId",
            "==",
            userId,
          ),
          where(
            "id",
            "==",
            id,
          ),
        ),
      ).then<void, never>(
        (stripePaymentMethodDocumentsQuerySnapshot: QuerySnapshot<StripePaymentMethodDocument, StripePaymentMethodDocument>): void => {
          stripePaymentMethodDocumentsQuerySnapshot.forEach(
            ({ ref: stripePaymentMethodDocumentReference }: QueryDocumentSnapshot<StripePaymentMethodDocument, StripePaymentMethodDocument>): void => stripePaymentMethodDocumentsWriteBatch.update<StripePaymentMethodDocument, StripePaymentMethodDocument>(
              stripePaymentMethodDocumentReference,
              {
                asyncDeleted: serverTimestamp(),
              },
            ) && void (0),
          );

          stripePaymentMethodDocumentsWriteBatch.commit().catch<never>(
            (error: unknown): never => {
              console.error("Something went wrong.");

              throw error;
            },
          );
        },
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }

}
