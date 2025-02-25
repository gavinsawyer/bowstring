import { isPlatformBrowser }                                                                                              from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                                           from "@angular/core";
import { toSignal }                                                                                                       from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, type User }                                                                              from "@angular/fire/auth";
import { collection, type CollectionReference, collectionSnapshots, Firestore, query, type QueryDocumentSnapshot, where } from "@angular/fire/firestore";
import { type StripeSetupIntentDocument }                                                                                 from "@bowstring/interfaces";
import { map, Observable, type Observer, of, startWith, switchMap, type TeardownLogic }                                   from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class StripeSetupIntentsService {

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly stripeSetupIntentDocuments$: Signal<StripeSetupIntentDocument[] | undefined> = isPlatformBrowser(this.platformId) ? toSignal<StripeSetupIntentDocument[] | undefined>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => {
        userObserver.next(this.auth.currentUser);

        onIdTokenChanged(
          this.auth,
          (user: User | null): void => userObserver.next(user),
        );
      },
    ).pipe<StripeSetupIntentDocument[] | undefined, StripeSetupIntentDocument[] | undefined>(
      switchMap<User | null, Observable<StripeSetupIntentDocument[]>>(
        (user: User | null): Observable<StripeSetupIntentDocument[]> => user && !user.isAnonymous ? collectionSnapshots<StripeSetupIntentDocument>(
          query<StripeSetupIntentDocument, StripeSetupIntentDocument>(
            collection(
              this.firestore,
              "stripeSetupIntents",
            ) as CollectionReference<StripeSetupIntentDocument, StripeSetupIntentDocument>,
            where(
              "userId",
              "==",
              user.uid,
            ),
          ),
        ).pipe<StripeSetupIntentDocument[]>(
          map<QueryDocumentSnapshot<StripeSetupIntentDocument>[], StripeSetupIntentDocument[]>(
            (stripeSetupIntentDocumentSnapshots: QueryDocumentSnapshot<StripeSetupIntentDocument>[]): StripeSetupIntentDocument[] => stripeSetupIntentDocumentSnapshots.length ? stripeSetupIntentDocumentSnapshots.map<StripeSetupIntentDocument>(
              (stripeSetupIntentDocumentSnapshot: QueryDocumentSnapshot<StripeSetupIntentDocument>): StripeSetupIntentDocument => stripeSetupIntentDocumentSnapshot.data(),
            ) : [],
          ),
        ) : of<StripeSetupIntentDocument[]>([]),
      ),
      startWith<StripeSetupIntentDocument[] | undefined, [ undefined ]>(undefined),
    ),
    {
      requireSync: true,
    },
  ) : signal<undefined>(undefined);

}
