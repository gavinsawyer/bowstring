import { isPlatformBrowser }                                                                                from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                             from "@angular/core";
import { toSignal }                                                                                         from "@angular/core/rxjs-interop";
import { collection, type CollectionReference, collectionSnapshots, Firestore, type QueryDocumentSnapshot } from "@angular/fire/firestore";
import { type StripePriceDocument }                                                                         from "@bowstring/interfaces";
import { map, startWith }                                                                                   from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class StripePricesService {

  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly stripePriceDocuments$: Signal<StripePriceDocument[] | undefined> = isPlatformBrowser(this.platformId) ? toSignal<StripePriceDocument[] | undefined>(
    collectionSnapshots<StripePriceDocument>(
      collection(
        this.firestore,
        "stripePrices",
      ) as CollectionReference<StripePriceDocument, StripePriceDocument>,
    ).pipe<StripePriceDocument[], StripePriceDocument[] | undefined>(
      map<QueryDocumentSnapshot<StripePriceDocument>[], StripePriceDocument[]>(
        (stripePriceDocumentSnapshots: QueryDocumentSnapshot<StripePriceDocument>[]): StripePriceDocument[] => stripePriceDocumentSnapshots.length ? stripePriceDocumentSnapshots.map<StripePriceDocument>(
          (stripePriceDocumentSnapshot: QueryDocumentSnapshot<StripePriceDocument>): StripePriceDocument => stripePriceDocumentSnapshot.data(),
        ) : [],
      ),
      startWith<StripePriceDocument[] | undefined, [ undefined ]>(undefined),
    ),
    {
      requireSync: true,
    },
  ) : signal<undefined>(undefined);

}
