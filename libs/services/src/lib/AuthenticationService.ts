import { isPlatformBrowser }                                                                                                                                                                                                             from "@angular/common";
import { afterRender, inject, Injectable, PLATFORM_ID, signal, type Signal, type WritableSignal }                                                                                                                                        from "@angular/core";
import { toSignal }                                                                                                                                                                                                                      from "@angular/core/rxjs-interop";
import { Auth, createUserWithEmailAndPassword, EmailAuthProvider, linkWithCredential, onIdTokenChanged, reauthenticateWithCredential, signInAnonymously, signInWithEmailAndPassword, unlink, updatePassword, type User, UserCredential } from "@angular/fire/auth";
import { doc, type DocumentData, type DocumentReference, Firestore, setDoc }                                                                                                                                                             from "@angular/fire/firestore";
import { Functions }                                                                                                                                                                                                                     from "@angular/fire/functions";
import { createUserWithPasskey, type FirebaseWebAuthnError, linkWithPasskey, signInWithPasskey, unlinkPasskey, verifyUserWithPasskey }                                                                                                   from "@firebase-web-authn/browser";
import { type AccountDocument }                                                                                                                                                                                                          from "@standard/interfaces";
import { filter, Observable, type Observer, tap, type TeardownLogic }                                                                                                                                                                    from "rxjs";
import { fromPromise }                                                                                                                                                                                                                   from "rxjs/internal/observable/innerFrom";
import { AccountService }                                                                                                                                                                                                                from "./AccountService";


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
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly functions: Functions             = inject<Functions>(Functions);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly accountService: AccountService   = inject<AccountService>(AccountService);

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

  public async createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).catch<never>(
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    );
  }
  public async createUserWithPasskey(name: string): Promise<UserCredential> {
    return createUserWithPasskey(
      this.auth,
      this.functions,
      name,
    ).catch<never>(
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
    const user: User | null = this.auth.currentUser;

    return user ? linkWithCredential(
      user,
      EmailAuthProvider.credential(
        email,
        password,
      ),
    ).then<void, never>(
      (): Promise<void> => setDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ user.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          security: {
            password: true,
          },
        },
        {
          merge: true,
        },
      ),
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    ) : Promise.reject<never>(new Error());
  }
  public linkWithPasskey(): Promise<void> {
    const email: string | undefined = this.accountService.accountDocument$()?.email;
    const user: User | null         = this.auth.currentUser;

    return (email && user) ? linkWithPasskey(
      this.auth,
      this.functions,
      email,
    ).then<void, never>(
      (): Promise<void> => setDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ user.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          security: {
            passkey: true,
          },
        },
        {
          merge: true,
        },
      ),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You already have a passkey." : firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    ) : Promise.reject<never>(new Error());
  }
  public linkWithPasskeyBackup(): Promise<void> {
    const email: string | undefined = this.accountService.accountDocument$()?.email;
    const user: User | null         = this.auth.currentUser;

    return (email && user) ? linkWithPasskey(
      this.auth,
      this.functions,
      `${ email } (Backup)`,
      "second",
    ).then<void, never>(
      (): Promise<void> => setDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ user.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          security: {
            passkeyBackup: true,
          },
        },
        {
          merge: true,
        },
      ),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You already have a passkey backup." : firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    ) : Promise.reject<never>(new Error());
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
      (): void => void (0),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You're already signed in as this user." : firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    );
  }
  public unlinkPasskey(): Promise<void> {
    const user: User | null = this.auth.currentUser;

    return user ? unlinkPasskey(
      this.auth,
      this.functions,
    ).then<void, never>(
      (): Promise<void> => setDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ user.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          security: {
            passkey: false,
          },
        },
        {
          merge: true,
        },
      ),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You do not have a passkey." : firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    ) : Promise.reject<never>(new Error());
  }
  public unlinkPasskeyBackup(): Promise<void> {
    const user: User | null = this.auth.currentUser;

    return user ? unlinkPasskey(
      this.auth,
      this.functions,
      "second",
    ).then<void, never>(
      (): Promise<void> => setDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ user.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          security: {
            passkeyBackup: false,
          },
        },
        {
          merge: true,
        },
      ),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.code === "firebaseWebAuthn/no-op" ? "You do not have a passkey." : firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    ) : Promise.reject<never>(new Error());
  }
  public unlinkPassword(): Promise<void> {
    const user: User | null = this.auth.currentUser;

    return user ? unlink(
      user,
      "password",
    ).then<void, never>(
      (): Promise<void> => setDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ user.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          security: {
            password: false,
          },
        },
        {
          merge: true,
        },
      ),
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    ) : Promise.reject<never>(new Error());
  }
  public updateEmailAndPasswordCredential(
    passwordCurrent: string,
    passwordNew: string,
  ): Promise<void> {
    const email: string | undefined = this.accountService.accountDocument$()?.email;
    const user: User | null         = this.auth.currentUser;

    return (email && user) ? reauthenticateWithCredential(
      user,
      EmailAuthProvider.credential(
        email,
        passwordCurrent,
      ),
    ).then<void, never>(
      (): Promise<void> => updatePassword(
        user,
        passwordNew,
      ).catch<never>(
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      ),
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    ) : Promise.reject<never>(new Error());
  }
  public verifyUserWithPasskey(): Promise<void> {
    return verifyUserWithPasskey(
      this.auth,
      this.functions,
    ).then<void, never>(
      (): void => void (0),
      (firebaseWebAuthnError: FirebaseWebAuthnError): never => {
        console.error(firebaseWebAuthnError.message || "Something went wrong.");

        throw firebaseWebAuthnError;
      },
    );
  }

}
