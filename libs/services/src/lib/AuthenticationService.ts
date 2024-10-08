import { isPlatformBrowser }                                                                                                                                       from "@angular/common";
import { afterRender, inject, Injectable, PLATFORM_ID, signal, type Signal, type WritableSignal }                                                                  from "@angular/core";
import { toSignal }                                                                                                                                                from "@angular/core/rxjs-interop";
import { Auth, createUserWithEmailAndPassword, EmailAuthProvider, linkWithCredential, onIdTokenChanged, signInAnonymously, signInWithEmailAndPassword, type User } from "@angular/fire/auth";
import { Functions }                                                                                                                                               from "@angular/fire/functions";
import { createUserWithPasskey, FirebaseWebAuthnError, linkWithPasskey, signInWithPasskey, verifyUserWithPasskey }                                                 from "@firebase-web-authn/browser";
import { type ProfileDocument }                                                                                                                                    from "@standard/interfaces";
import { filter, Observable, type Observer, tap, type TeardownLogic }                                                                                              from "rxjs";
import { fromPromise }                                                                                                                                             from "rxjs/internal/observable/innerFrom";
import { ProfileService }                                                                                                                                          from "./ProfileService";


@Injectable(
  {
    providedIn: "root",
  },
)
export class AuthenticationService {

  constructor() {
    afterRender(
      (): void => this.hasWebAuthn$.set(typeof PublicKeyCredential === "function"),
    );
  }

  private readonly auth: Auth                       = inject<Auth>(Auth);
  private readonly functions: Functions             = inject<Functions>(Functions);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly profileService: ProfileService   = inject<ProfileService>(ProfileService);

  public readonly hasWebAuthn$: WritableSignal<boolean | undefined>                           = signal<undefined>(undefined);
  public readonly hasWebAuthnConditionalMediation$: Signal<boolean | undefined>               = isPlatformBrowser(this.platformId) ? toSignal<boolean>(
    fromPromise<boolean>(
      PublicKeyCredential.isConditionalMediationAvailable(),
    ),
  ) : signal<undefined>(undefined);
  public readonly hasWebAuthnUserVerifyingPlatformAuthenticator$: Signal<boolean | undefined> = isPlatformBrowser(this.platformId) ? toSignal<boolean>(
    fromPromise<boolean>(
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
    ),
  ) : signal<undefined>(undefined);
  public readonly user$: Signal<User | undefined>                                             = isPlatformBrowser(this.platformId) ? toSignal<User>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => onIdTokenChanged(
        this.auth,
        (user: User | null): void => userObserver.next(user),
      ),
    ).pipe<User | null, User>(
      tap<User | null>(
        (user: User | null): void => {
          if (!user)
            signInAnonymously(
              this.auth,
            ).catch<never>(
              (error: unknown): never => {
                console.error("Something went wrong.");

                throw error;
              },
            );
        },
      ),
      filter<User | null, User>(
        (user: User | null): user is User => !!user,
      ),
    ),
  ) : signal<undefined>(undefined);

  public createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    return createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).then<void, never>(
      (): void => console.log("Success"),
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    );
  }
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
  public linkWithEmailAndPasswordCredential(
    email: string,
    password: string,
  ): Promise<void> {
    if (this.auth.currentUser)
      return linkWithCredential(
        this.auth.currentUser,
        EmailAuthProvider.credential(
          email,
          password,
        ),
      ).then<void, never>(
        (): void => console.log("Success"),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
    else
      return Promise.reject<never>(new Error());
  }
  public linkWithPasskey(): Promise<void> {
    return ((profileDocument?: ProfileDocument): Promise<void> => {
      if (profileDocument)
        return linkWithPasskey(
          this.auth,
          this.functions,
          `${ profileDocument.email }`,
        ).then<void, never>(
          (): void => console.log("Success"),
          (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
            console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You already have a passkey." : firebaseWebAuthnError.message || "Something went wrong.");

            throw firebaseWebAuthnError;
          },
        );
      else
        return Promise.reject<never>(new Error());
    })(this.profileService.profileDocument$());
  }
  public linkWithPasskeyBackup(): Promise<void> {
    return ((profileDocument?: ProfileDocument): Promise<void> => {
      if (profileDocument)
        return linkWithPasskey(
          this.auth,
          this.functions,
          `${ profileDocument.email } (Backup)`,
          "second",
        ).then<void, never>(
          (): void => console.log("Success"),
          (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
            console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You already have a passkey backup." : firebaseWebAuthnError.message || "Something went wrong.");

            throw firebaseWebAuthnError;
          },
        );
      else
        return Promise.reject<never>(new Error());
    })(this.profileService.profileDocument$());
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
  public signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    return signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).then<void, never>(
      (): void => console.log("Success"),
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
