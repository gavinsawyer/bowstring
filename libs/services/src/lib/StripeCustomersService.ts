import { isPlatformBrowser }                                                            from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                         from "@angular/core";
import { toSignal }                                                                     from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, type User }                                            from "@angular/fire/auth";
import { doc, docSnapshots, type DocumentReference, type DocumentSnapshot, Firestore }  from "@angular/fire/firestore";
import { type StripeCustomerDocument }                                                  from "@bowstring/interfaces";
import { map, Observable, type Observer, of, startWith, switchMap, type TeardownLogic } from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class StripeCustomersService {

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly stripeCustomerDocument$: Signal<StripeCustomerDocument | undefined> = isPlatformBrowser(this.platformId) ? toSignal<StripeCustomerDocument | undefined>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => onIdTokenChanged(
        this.auth,
        (user: User | null): void => userObserver.next(user),
      ),
    ).pipe<User | null, StripeCustomerDocument | undefined>(
      startWith<User | null, [ User | null ]>(this.auth.currentUser),
      switchMap<User | null, Observable<StripeCustomerDocument | undefined>>(
        (user: User | null): Observable<StripeCustomerDocument | undefined> => user && !user.isAnonymous ? docSnapshots<StripeCustomerDocument>(
          doc(
            this.firestore,
            `/stripeCustomers/${ user.uid }`,
          ) as DocumentReference<StripeCustomerDocument, StripeCustomerDocument>,
        ).pipe<StripeCustomerDocument | undefined, StripeCustomerDocument | undefined>(
          map<DocumentSnapshot<StripeCustomerDocument>, StripeCustomerDocument | undefined>(
            (accountDocumentSnapshot: DocumentSnapshot<StripeCustomerDocument>): StripeCustomerDocument | undefined => accountDocumentSnapshot.data(),
          ),
          startWith<StripeCustomerDocument | undefined, [ undefined ]>(undefined),
        ) : of<undefined>(undefined),
      ),
    ),
  ) : signal<undefined>(undefined);

}
