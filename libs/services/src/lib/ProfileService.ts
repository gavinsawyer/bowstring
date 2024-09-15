import { isPlatformBrowser }                                                   from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal }                     from "@angular/core";
import { toSignal }                                                            from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, User }                                        from "@angular/fire/auth";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore }   from "@angular/fire/firestore";
import { ProfileDocument }                                                     from "@standard/interfaces";
import { catchError, map, Observable, Observer, of, switchMap, TeardownLogic } from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class ProfileService {

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public profileDocument$: Signal<ProfileDocument | null> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<ProfileDocument | null, null>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => {
        userObserver.next(this.auth.currentUser);

        return onIdTokenChanged(
          this.auth,
          (user: User | null) => userObserver.next(user),
        );
      },
    ).pipe<ProfileDocument | null>(
      switchMap<User | null, Observable<ProfileDocument | null>>(
        (user: User | null): Observable<ProfileDocument | null> => user?.isAnonymous === false ? docSnapshots<ProfileDocument>(
          doc(
            this.firestore,
            `/profiles/${ user.uid }`,
          ) as DocumentReference<ProfileDocument>,
        ).pipe<DocumentSnapshot<ProfileDocument>, ProfileDocument | null>(
          catchError<DocumentSnapshot<ProfileDocument>, Observable<DocumentSnapshot<ProfileDocument>>>(
            (error: unknown): Observable<DocumentSnapshot<ProfileDocument>> => {
              console.error(error);

              return new Observable<DocumentSnapshot<ProfileDocument>>();
            },
          ),
          map<DocumentSnapshot<ProfileDocument>, ProfileDocument | null>(
            (profileDocumentSnapshot: DocumentSnapshot<ProfileDocument>): ProfileDocument | null => profileDocumentSnapshot.data() || null,
          ),
        ) : of<null>(null),
      ),
    ),
    {
      initialValue: null,
    },
  ) : signal<null>(null);

}
