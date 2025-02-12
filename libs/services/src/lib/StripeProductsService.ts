import { isPlatformBrowser }                                                                                from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                             from "@angular/core";
import { toSignal }                                                                                         from "@angular/core/rxjs-interop";
import { collection, type CollectionReference, collectionSnapshots, Firestore, type QueryDocumentSnapshot } from "@angular/fire/firestore";
import { type StripeProductDocument }                                                                       from "@standard/interfaces";
import { map, startWith }                                                                                   from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class StripeProductsService {

  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly stripeProductDocuments$: Signal<StripeProductDocument[] | undefined> = isPlatformBrowser(this.platformId) ? toSignal<StripeProductDocument[] | undefined>(
    collectionSnapshots<StripeProductDocument>(
      collection(
        this.firestore,
        "stripeProducts",
      ) as CollectionReference<StripeProductDocument, StripeProductDocument>,
    ).pipe<StripeProductDocument[], StripeProductDocument[] | undefined>(
      map<QueryDocumentSnapshot<StripeProductDocument>[], StripeProductDocument[]>(
        (StripeProductDocumentSnapshots: QueryDocumentSnapshot<StripeProductDocument>[]): StripeProductDocument[] => StripeProductDocumentSnapshots.length ? StripeProductDocumentSnapshots.map<StripeProductDocument>(
          (StripeProductDocumentSnapshot: QueryDocumentSnapshot<StripeProductDocument>): StripeProductDocument => StripeProductDocumentSnapshot.data(),
        ) : [],
      ),
      startWith<StripeProductDocument[] | undefined, [ undefined ]>(undefined),
    ),
    {
      requireSync: true,
    },
  ) : signal<undefined>(undefined);

}
