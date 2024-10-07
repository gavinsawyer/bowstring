import { isPlatformBrowser }                                                                                from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                             from "@angular/core";
import { toSignal }                                                                                         from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, type User }                                                                from "@angular/fire/auth";
import { doc, docSnapshots, type DocumentReference, type DocumentSnapshot, Firestore }                      from "@angular/fire/firestore";
import { type ProfileDocument }                                                                             from "@standard/interfaces";
import { catchError, filter, map, Observable, type Observer, of, startWith, switchMap, type TeardownLogic } from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class ProfileService {

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public profileDocument$: Signal<ProfileDocument | undefined> = isPlatformBrowser(this.platformId) ? toSignal<ProfileDocument | undefined>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => onIdTokenChanged(
        this.auth,
        (user: User | null) => userObserver.next(user),
      ),
    ).pipe<User | null, User, ProfileDocument | undefined>(
      startWith<User | null, [ User | null ]>(this.auth.currentUser),
      filter<User | null, User>(
        (user: User | null): user is User => !!user,
      ),
      switchMap<User, Observable<ProfileDocument | undefined>>(
        (user: User): Observable<ProfileDocument | undefined> => {
          if (user.isAnonymous)
            return of<undefined>(undefined);
          else
            return docSnapshots<ProfileDocument>(
              doc(
                this.firestore,
                `/profiles/${ user.uid }`,
              ) as DocumentReference<ProfileDocument>,
            ).pipe<DocumentSnapshot<ProfileDocument> | undefined, ProfileDocument | undefined>(
              catchError<DocumentSnapshot<ProfileDocument>, Observable<undefined>>(
                (error: unknown): Observable<undefined> => {
                  console.error(error);

                  return of<undefined>(undefined);
                },
              ),
              map<DocumentSnapshot<ProfileDocument> | undefined, ProfileDocument | undefined>(
                (profileDocumentSnapshot?: DocumentSnapshot<ProfileDocument>): ProfileDocument | undefined => profileDocumentSnapshot?.data(),
              ),
            );
        },
      ),
    ),
  ) : signal<undefined>(undefined);

}
