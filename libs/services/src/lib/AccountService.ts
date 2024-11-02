import { isPlatformBrowser }                                                                                         from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                                      from "@angular/core";
import { toSignal }                                                                                                  from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, signInAnonymously, type User, type UserCredential }                                 from "@angular/fire/auth";
import { doc, docSnapshots, type DocumentData, type DocumentReference, type DocumentSnapshot, Firestore, updateDoc } from "@angular/fire/firestore";
import { type AccountDocument }                                                                                      from "@standard/interfaces";
import { catchError, filter, map, Observable, type Observer, startWith, switchMap, type TeardownLogic }              from "rxjs";
import { fromPromise }                                                                                               from "rxjs/internal/observable/innerFrom";


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
      (userObserver: Observer<User | null>): TeardownLogic => onIdTokenChanged(
        this.auth,
        (user: User | null) => userObserver.next(user),
      ),
    ).pipe<User | null, User, AccountDocument | undefined>(
      startWith<User | null, [ User | null ]>(this.auth.currentUser),
      filter<User | null, User>(
        (user: User | null): user is User => !!user && !user.isAnonymous,
      ),
      switchMap<User, Observable<AccountDocument | undefined>>(
        ({ uid: userId }: User): Observable<AccountDocument | undefined> => docSnapshots<AccountDocument>(
          doc(
            this.firestore,
            `/accounts/${ userId }`,
          ) as DocumentReference<AccountDocument>,
        ).pipe<AccountDocument | undefined, AccountDocument | undefined>(
          map<DocumentSnapshot<AccountDocument>, AccountDocument | undefined>(
            (accountDocumentSnapshot: DocumentSnapshot<AccountDocument>): AccountDocument | undefined => accountDocumentSnapshot.data(),
          ),
          catchError<AccountDocument | undefined, Observable<undefined>>(
            (error: unknown): Observable<undefined> => {
              console.error(error);

              return fromPromise<UserCredential>(
                signInAnonymously(this.auth),
              ).pipe<undefined>(
                map<UserCredential, undefined>(
                  (): undefined => undefined,
                ),
              );
            },
          ),
        ),
      ),
    ),
  ) : signal<undefined>(undefined);

  public update(accountDocumentPartial: Partial<AccountDocument>): Promise<void> {
    if (this.auth.currentUser && !this.auth.currentUser.isAnonymous)
      return updateDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ this.auth.currentUser.uid }`,
        ) as DocumentReference<AccountDocument>,
        accountDocumentPartial,
      ).catch<never>(
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
    else
      return Promise.reject<never>(new Error());
  }

}
