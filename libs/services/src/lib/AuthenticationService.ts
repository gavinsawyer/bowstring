import { isPlatformBrowser }                                                                                       from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal }                                                    from "@angular/core";
import { toSignal }                                                                                                from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, signInAnonymously, type User, type UserCredential }                               from "@angular/fire/auth";
import { Functions }                                                                                               from "@angular/fire/functions";
import { createUserWithPasskey, FirebaseWebAuthnError, linkWithPasskey, signInWithPasskey, verifyUserWithPasskey } from "@firebase-web-authn/browser";
import { type ProfileDocument }                                                                                    from "@standard/interfaces";
import { Observable, type Observer, type TeardownLogic }                                                           from "rxjs";
import { fromPromise }                                                                                             from "rxjs/internal/observable/innerFrom";
import { ProfileService }                                                                                          from "./ProfileService";


@Injectable(
  {
    providedIn: "root",
  },
)
export class AuthenticationService {

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly functions: Functions             = inject<Functions>(Functions);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly profileService: ProfileService   = inject<ProfileService>(ProfileService);

  public readonly hasWebAuthn$: Signal<boolean>                                   = signal<boolean>(typeof PublicKeyCredential === "function");
  public readonly hasWebAuthnConditionalMediation$: Signal<boolean>               = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean, false>(
    fromPromise<boolean>(
      PublicKeyCredential.isConditionalMediationAvailable(),
    ),
    {
      initialValue: false,
    },
  ) : signal<false>(false);
  public readonly hasWebAuthnUserVerifyingPlatformAuthenticator$: Signal<boolean> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean, false>(
    fromPromise<boolean>(
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
    ),
    {
      initialValue: false,
    },
  ) : signal<false>(false);
  public readonly user$: Signal<User | null>                                      = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<User | null, User | null>(
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
    ),
    {
      initialValue: this.auth.currentUser,
    },
  ) : signal<User | null>(null);

  public createUserWithPasskey(name: string): Promise<void> {
    return createUserWithPasskey(
      this.auth,
      this.functions,
      name,
    ).then<void, never>(
      (): void => console.log("Success"),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.message);

        throw firebaseWebAuthnError;
      },
    );
  }
  public linkBackupPasskey(): Promise<void> {
    return (async (profileDocument: ProfileDocument | null): Promise<void> => profileDocument ? linkWithPasskey(
      this.auth,
      this.functions,
      `${ profileDocument.name } (Backup)`,
      "second",
    ).then<void, never>(
      (): void => console.log("Success"),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You already have a backup passkey." : firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    ) : void (0))(this.profileService.profileDocument$());
  }
  public signInAnonymously(): Promise<void> {
    return signInAnonymously(
      this.auth,
    ).then<void, never>(
      (): void => void (0),
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    );
  }
  public signInWithPasskey(): Promise<void> {
    return signInWithPasskey(
      this.auth,
      this.functions,
    ).then<void, never>(
      (): void => console.log("Success"),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You're already signed in as this user." : firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    );
  }
  public verifyUserWithPasskey(): Promise<void> {
    return verifyUserWithPasskey(
      this.auth,
      this.functions,
    ).then<void, never>(
      (): void => console.log("Success"),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    );
  }

}
