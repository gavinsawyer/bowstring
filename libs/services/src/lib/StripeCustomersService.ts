import { isPlatformBrowser }                                                                                              from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                                           from "@angular/core";
import { toSignal }                                                                                                       from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, type User }                                                                              from "@angular/fire/auth";
import { collection, type CollectionReference, collectionSnapshots, Firestore, query, type QueryDocumentSnapshot, where } from "@angular/fire/firestore";
import { type StripeCustomerDocument }                                                                                    from "@bowstring/interfaces";
import { map, Observable, type Observer, of, startWith, switchMap, type TeardownLogic }                                   from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class StripeCustomersService {

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly stripeCustomerDocuments$: Signal<StripeCustomerDocument[] | undefined> = isPlatformBrowser(this.platformId) ? toSignal<StripeCustomerDocument[] | undefined>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => onIdTokenChanged(
        this.auth,
        (user: User | null): void => userObserver.next(user),
      ),
    ).pipe<User | null, StripeCustomerDocument[] | undefined, StripeCustomerDocument[] | undefined>(
      startWith<User | null, [ User | null ]>(this.auth.currentUser),
      switchMap<User | null, Observable<StripeCustomerDocument[]>>(
        (user: User | null): Observable<StripeCustomerDocument[]> => user && !user.isAnonymous ? collectionSnapshots<StripeCustomerDocument>(
          query<StripeCustomerDocument, StripeCustomerDocument>(
            collection(
              this.firestore,
              "stripeCustomers",
            ) as CollectionReference<StripeCustomerDocument, StripeCustomerDocument>,
            where(
              "userId",
              "==",
              user.uid,
            ),
          ),
        ).pipe<StripeCustomerDocument[]>(
          map<QueryDocumentSnapshot<StripeCustomerDocument>[], StripeCustomerDocument[]>(
            (stripeCustomerDocumentSnapshots: QueryDocumentSnapshot<StripeCustomerDocument>[]): StripeCustomerDocument[] => stripeCustomerDocumentSnapshots.length ? stripeCustomerDocumentSnapshots.map<StripeCustomerDocument>(
              (stripeCustomerDocumentSnapshot: QueryDocumentSnapshot<StripeCustomerDocument>): StripeCustomerDocument => stripeCustomerDocumentSnapshot.data(),
            ) : [],
          ),
        ) : of<StripeCustomerDocument[]>([]),
      ),
      startWith<StripeCustomerDocument[] | undefined, [ undefined ]>(undefined),
    ),
    {
      requireSync: true,
    },
  ) : signal<undefined>(undefined);


}
