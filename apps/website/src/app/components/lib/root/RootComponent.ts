import { DOCUMENT, isPlatformBrowser, Location }                                           from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID }                                       from "@angular/core";
import { type User }                                                                       from "@angular/fire/auth";
import { deleteDoc, doc, type DocumentReference, Firestore, setDoc }                       from "@angular/fire/firestore";
import { type AbstractControl, FormControl, FormGroup, type ValidationErrors, Validators } from "@angular/forms";
import { type SheetComponent }                                                             from "@standard/components";
import { CanvasDirective, FlexboxContainerDirective }                                      from "@standard/directives";
import { BRAND, GIT_INFO, PACKAGE_VERSION }                                                from "@standard/injection-tokens";
import { type ProfileDocument }                                                            from "@standard/interfaces";
import { AuthenticationService, ResponsivityService }                                      from "@standard/services";
import { type Brand }                                                                      from "@standard/types";
import { type GitInfo }                                                                    from "git-describe";
import { LOCALE_IDS }                                                                      from "../../../injection tokens";
import { type LocaleId }                                                                   from "../../../types";


@Component(
  {
    hostDirectives: [
      {
        directive: CanvasDirective,
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
    ],
    selector:       "standard-website--root",
    styleUrls:      [
      "RootComponent.sass",
    ],
    templateUrl:    "RootComponent.html",
  },
)
export class RootComponent {

  private readonly document: Document               = inject<Document>(DOCUMENT);
  private readonly firestore: Firestore             = inject<Firestore>(Firestore);
  private readonly location: Location               = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly authenticationService: AuthenticationService                                                                                               = inject<AuthenticationService>(AuthenticationService);
  protected readonly brand: Brand                                                                                                                               = inject<Brand>(BRAND);
  protected readonly gitInfo: Partial<GitInfo>                                                                                                                  = inject<Partial<GitInfo>>(GIT_INFO);
  protected readonly localeId: LocaleId                                                                                                                         = inject<LocaleId>(LOCALE_ID);
  protected readonly localeIds: LocaleId[]                                                                                                                      = inject<LocaleId[]>(LOCALE_IDS);
  protected readonly localeDisplayNames: Intl.DisplayNames                                                                                                      = new Intl.DisplayNames(
    [
      this.localeId,
    ],
    {
      type: "language",
    },
  );
  protected readonly packageVersion: string                                                                                                                     = inject<string>(PACKAGE_VERSION);
  protected readonly responsivityService: ResponsivityService                                                                                                   = inject<ResponsivityService>(ResponsivityService);
  protected readonly signinFormGroup: FormGroup<{ "email": FormControl<string>, "password": FormControl<string> }>                                              = new FormGroup<{ "email": FormControl<string>, "password": FormControl<string> }>(
    {
      email:    new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
      password: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
    },
  );
  protected readonly signupFormGroup: FormGroup<{ "email": FormControl<string>, "password": FormControl<string>, "passwordConfirmation": FormControl<string> }> = new FormGroup<{ "email": FormControl<string>, "password": FormControl<string>, "passwordConfirmation": FormControl<string> }>(
    {
      email:                new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
      password:             new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
      passwordConfirmation: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
    },
    {
      validators: [
        ({ value }: AbstractControl): ValidationErrors | null => value.password !== value.passwordConfirmation ? {
          "passwordConfirmationMatches": true,
        } : null,
      ],
    },
  );
  protected readonly signupWithWebAuthnFormGroup: FormGroup<{ "email": FormControl<string> }>                                                                   = new FormGroup<{ "email": FormControl<string> }>(
    {
      email: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
    },
  );

  protected changeLocale(localeId: LocaleId): void {
    return isPlatformBrowser(
      this.platformId,
    ) ? ((): void => {
      this.document.location.href = `/${ localeId + this.location.path() }`;
    })() : void (0);
  }
  protected signinFormSubmit(sheetComponent: SheetComponent): void {
    if (this.signinFormGroup.value.email && this.signinFormGroup.value.password)
      this.authenticationService.signInWithEmailAndPassword(
        this.signinFormGroup.value.email,
        this.signinFormGroup.value.password,
      ).then<void>(
        (): void => {
          sheetComponent.openModel$.set(false);

          setTimeout(
            (): void => this.signinFormGroup.reset(),
            180,
          );
        },
      );
  }
  protected signinWithWebAuthnFormSubmit(sheetComponent: SheetComponent): void {
    this.authenticationService.signInWithPasskey().then<void>(
      (): void => sheetComponent.openModel$.set(false),
    );
  }
  protected signupFormSubmit(sheetComponent: SheetComponent): void {
    ((user: User | null): void => {
      if (user)
        ((profileDocumentReference: DocumentReference<ProfileDocument>): void => {
          setDoc(
            profileDocumentReference,
            {
              email: this.signupFormGroup.value.email,
            },
          ).then<void, void>(
            (): void => {
              if (this.signupFormGroup.value.email && this.signupFormGroup.value.password)
                this.authenticationService.createUserWithEmailAndPassword(
                  this.signupFormGroup.value.email,
                  this.signupFormGroup.value.password,
                ).then<void, never>(
                  (): void => {
                    sheetComponent.openModel$.set(false);

                    setTimeout(
                      (): void => this.signupFormGroup.reset(),
                      180,
                    );
                  },
                  (error: unknown): never => {
                    deleteDoc(profileDocumentReference).then();

                    throw error;
                  },
                );
            },
          );
        })(
          doc(
            this.firestore,
            `/profiles/${ user.uid }`,
          ) as DocumentReference<ProfileDocument>,
        );
    })(this.authenticationService.user$());
  }
  protected async signupWithWebAuthnFormSubmit(sheetComponent: SheetComponent): Promise<void> {
    ((user: User | null): void => {
      if (user)
        ((profileDocumentReference: DocumentReference<ProfileDocument>): void => {
          setDoc(
            profileDocumentReference,
            {
              email: this.signupWithWebAuthnFormGroup.value.email,
            },
          ).then<void, void>(
            (): void => {
              if (this.signupWithWebAuthnFormGroup.value.email)
                this.authenticationService.createUserWithPasskey(this.signupWithWebAuthnFormGroup.value.email).then<void, never>(
                  (): void => {
                    sheetComponent.openModel$.set(false);

                    setTimeout(
                      (): void => this.signupWithWebAuthnFormGroup.reset(),
                      180,
                    );
                  },
                  (error: unknown): never => {
                    deleteDoc(profileDocumentReference).then();

                    throw error;
                  },
                );
            },
          );
        })(
          doc(
            this.firestore,
            `/profiles/${ user.uid }`,
          ) as DocumentReference<ProfileDocument>,
        );
    })(this.authenticationService.user$());
  }

}
