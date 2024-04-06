import { isPlatformBrowser }                                                                                       from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal }                                                         from "@angular/core";
import { toSignal }                                                                                                from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, signInAnonymously, User, UserCredential }                                         from "@angular/fire/auth";
import { Functions }                                                                                               from "@angular/fire/functions";
import { createUserWithPasskey, FirebaseWebAuthnError, linkWithPasskey, signInWithPasskey, verifyUserWithPasskey } from "@firebase-web-authn/browser";
import { ProfileDocument }                                                                                         from "@standard/interfaces";
import { Observable, Observer, startWith, TeardownLogic }                                                          from "rxjs";
import { ProfileService }                                                                                          from "./ProfileService";


@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  private readonly auth:           Auth                 = inject<Auth>(Auth);
  private readonly functions:      Functions            = inject<Functions>(Functions);
  private readonly platformId:     NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly profileService: ProfileService       = inject<ProfileService>(ProfileService);

  public readonly user$:                 Signal<User | null>             = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<User | null>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => onIdTokenChanged(
        this.auth,
        async (user: User | null): Promise<void> => user === null ? signInAnonymously(
          this.auth,
        ).then<void>(
          (userCredential: UserCredential): void => userObserver.next(
            userCredential.user,
          ),
        ) : userObserver.next(user),
      ),
    ).pipe<User | null>(
      startWith<User | null, [ User | null ]>(
        this.auth.currentUser,
      ),
    ),
    {
      requireSync: true,
    },
  ) : signal<User | null>(null);
  public readonly createUserWithPasskey: (name: string) => Promise<void> = (name:string): Promise<void> => createUserWithPasskey(
    this.auth,
    this.functions,
    name,
  ).then<void, never>(
    (): void => console.log("Success"),
    (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
      console
        .error(firebaseWebAuthnError.message);

      throw firebaseWebAuthnError;
    },
  );
  public readonly linkBackupPasskey:     () => Promise<void>             = (): Promise<void> => (async (profileDocument: ProfileDocument | null): Promise<void> => profileDocument ? linkWithPasskey(
    this.auth,
    this.functions,
    `${profileDocument.name} (Backup)`,
    "second",
  ).then<void, never>(
    (): void => console.log("Success"),
    (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
      console
        .error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You already have a backup passkey." : firebaseWebAuthnError.message || "Something went wrong.");

      throw firebaseWebAuthnError;
    },
  ) : void (0))(this.profileService.profileDocument$());
  public readonly signInAnonymously:     () => Promise<void>             = (): Promise<void> => signInAnonymously(
    this.auth,
  )
    .then<void, never>(
      (): void => void (0),
      (error: unknown): never => {
        console
          .error("Something went wrong.");

        throw error;
      },
    );
  public readonly signInWithPasskey:     () => Promise<void>             = (): Promise<void> => signInWithPasskey(
    this.auth,
    this.functions,
  )
    .then<void, never>(
      (): void => console.log("Success"),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console
          .error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You're already signed in as this user." : firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    );
  public readonly verifyUserWithPasskey: () => Promise<void>             = (): Promise<void> => verifyUserWithPasskey(
    this.auth,
    this.functions,
  )
    .then<void, never>(
      (): void => console.log("Success"),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console
          .error(firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    );

}
