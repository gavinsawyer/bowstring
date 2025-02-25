import { isPlatformBrowser }                                                            from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                         from "@angular/core";
import { toSignal }                                                                     from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, type User }                                            from "@angular/fire/auth";
import { doc, docSnapshots, type DocumentReference, type DocumentSnapshot, Firestore }  from "@angular/fire/firestore";
import { type AccountDocument }                                                         from "@bowstring/interfaces";
import { map, Observable, type Observer, of, startWith, switchMap, type TeardownLogic } from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class AccountService {

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly accountDocument$: Signal<AccountDocument | undefined> = isPlatformBrowser(this.platformId) ? toSignal<AccountDocument | undefined>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => {
        userObserver.next(this.auth.currentUser);

        onIdTokenChanged(
          this.auth,
          (user: User | null): void => userObserver.next(user),
        );
      },
    ).pipe<AccountDocument | undefined, AccountDocument | undefined>(
      switchMap<User | null, Observable<AccountDocument | undefined>>(
        (user: User | null): Observable<AccountDocument | undefined> => user && !user.isAnonymous ? docSnapshots<AccountDocument>(
          doc(
            this.firestore,
            `/accounts/${ user.uid }`,
          ) as DocumentReference<AccountDocument, AccountDocument>,
        ).pipe<AccountDocument | undefined>(
          map<DocumentSnapshot<AccountDocument>, AccountDocument | undefined>(
            (accountDocumentSnapshot: DocumentSnapshot<AccountDocument>): AccountDocument | undefined => accountDocumentSnapshot.data(),
          ),
        ) : of<undefined>(undefined),
      ),
      startWith<AccountDocument | undefined, [ undefined ]>(undefined),
    ),
  ) : signal<undefined>(undefined);

}
