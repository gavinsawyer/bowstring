import { isPlatformBrowser }                                                                                              from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                                           from "@angular/core";
import { toSignal }                                                                                                       from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, type User }                                                                              from "@angular/fire/auth";
import { collection, type CollectionReference, collectionSnapshots, Firestore, query, type QueryDocumentSnapshot, where } from "@angular/fire/firestore";
import { type StripePaymentMethodDocument }                                                                               from "@bowstring/interfaces";
import { map, Observable, type Observer, of, startWith, switchMap, type TeardownLogic }                                   from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class StripePaymentMethodsService {

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly stripePaymentMethodDocuments$: Signal<StripePaymentMethodDocument[] | undefined> = isPlatformBrowser(this.platformId) ? toSignal<StripePaymentMethodDocument[] | undefined>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => {
        userObserver.next(this.auth.currentUser);

        onIdTokenChanged(
          this.auth,
          (user: User | null): void => userObserver.next(user),
        );
      },
    ).pipe<StripePaymentMethodDocument[] | undefined, StripePaymentMethodDocument[] | undefined>(
      switchMap<User | null, Observable<StripePaymentMethodDocument[]>>(
        (user: User | null): Observable<StripePaymentMethodDocument[]> => user && !user.isAnonymous ? collectionSnapshots<StripePaymentMethodDocument>(
          query<StripePaymentMethodDocument, StripePaymentMethodDocument>(
            collection(
              this.firestore,
              "stripePaymentMethods",
            ) as CollectionReference<StripePaymentMethodDocument, StripePaymentMethodDocument>,
            where(
              "userId",
              "==",
              user.uid,
            ),
          ),
        ).pipe<StripePaymentMethodDocument[]>(
          map<QueryDocumentSnapshot<StripePaymentMethodDocument>[], StripePaymentMethodDocument[]>(
            (stripePaymentMethodDocumentSnapshots: QueryDocumentSnapshot<StripePaymentMethodDocument>[]): StripePaymentMethodDocument[] => stripePaymentMethodDocumentSnapshots.length ? stripePaymentMethodDocumentSnapshots.map<StripePaymentMethodDocument>(
              (stripePaymentMethodDocumentSnapshot: QueryDocumentSnapshot<StripePaymentMethodDocument>): StripePaymentMethodDocument => stripePaymentMethodDocumentSnapshot.data(),
            ) : [],
          ),
        ) : of<StripePaymentMethodDocument[]>([]),
      ),
      startWith<StripePaymentMethodDocument[] | undefined, [ undefined ]>(undefined),
    ),
    {
      requireSync: true,
    },
  ) : signal<undefined>(undefined);

}
