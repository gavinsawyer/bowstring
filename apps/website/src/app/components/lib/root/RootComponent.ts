import { DOCUMENT, isPlatformBrowser, Location }                                                         from "@angular/common";
import { Component, inject, Injector, LOCALE_ID, PLATFORM_ID, type Signal, type TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                        from "@angular/core/rxjs-interop";
import { type User }                                                                                     from "@angular/fire/auth";
import { doc, type DocumentReference, Firestore, updateDoc }                                             from "@angular/fire/firestore";
import { type AbstractControl, FormControl, FormGroup, type ValidationErrors, Validators }               from "@angular/forms";
import { RouterOutlet }                                                                                  from "@angular/router";
import { type RouteComponent, type SheetComponent }                                                      from "@standard/components";
import { CanvasDirective, FlexboxContainerDirective }                                                    from "@standard/directives";
import { BRAND, GIT_INFO, PACKAGE_VERSION }                                                              from "@standard/injection-tokens";
import { type AccountDocument }                                                                          from "@standard/interfaces";
import { AuthenticationService, ResponsivityService }                                                    from "@standard/services";
import { type Brand }                                                                                    from "@standard/types";
import { type GitInfo }                                                                                  from "git-describe";
import { map, type Observable, startWith, switchMap }                                                    from "rxjs";
import { LOCALE_IDS }                                                                                    from "../../../injection tokens";
import { type LocaleId }                                                                                 from "../../../types";


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

  private readonly document: Document                  = inject<Document>(DOCUMENT);
  private readonly firestore: Firestore                = inject<Firestore>(Firestore);
  private readonly injector: Injector                  = inject<Injector>(Injector);
  private readonly location: Location                  = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown>    = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly routerOutlet$: Signal<RouterOutlet> = viewChild.required<RouterOutlet>(RouterOutlet);

  protected readonly aboveTemplateRef$: Signal<TemplateRef<never> | null>                                                                                       = toSignal<TemplateRef<never> | null>(
    toObservable<RouterOutlet>(
      this.routerOutlet$,
    ).pipe<TemplateRef<never> | null, TemplateRef<never> | null>(
      switchMap<RouterOutlet, Observable<TemplateRef<never> | null>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<never> | null> => routerOutlet.activateEvents.asObservable().pipe<TemplateRef<never> | undefined, TemplateRef<never> | undefined, TemplateRef<never> | null>(
          switchMap<RouteComponent, Observable<TemplateRef<never> | undefined>>(
            (routeComponent: RouteComponent): Observable<TemplateRef<never> | undefined> => toObservable(
              routeComponent.aboveTemplateRef$,
              {
                injector: this.injector,
              },
            ),
          ),
          startWith<TemplateRef<never> | undefined, [ TemplateRef<never> | undefined ]>(
            (routerOutlet.component as RouteComponent).aboveTemplateRef$(),
          ),
          map<TemplateRef<never> | undefined, TemplateRef<never> | null>(
            (templateRef?: TemplateRef<never>): TemplateRef<never> | null => templateRef || null,
          ),
        ),
      ),
      startWith<TemplateRef<never> | null, [ null ]>(null),
    ),
    {
      requireSync: true,
    },
  );
  protected readonly authenticationService: AuthenticationService                                                                                               = inject<AuthenticationService>(AuthenticationService);
  protected readonly belowTemplateRef$: Signal<TemplateRef<never> | null>                                                                                       = toSignal<TemplateRef<never> | null>(
    toObservable<RouterOutlet>(
      this.routerOutlet$,
    ).pipe<TemplateRef<never> | null, TemplateRef<never> | null>(
      switchMap<RouterOutlet, Observable<TemplateRef<never> | null>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<never> | null> => routerOutlet.activateEvents.asObservable().pipe<TemplateRef<never> | undefined, TemplateRef<never> | undefined, TemplateRef<never> | null>(
          switchMap<RouteComponent, Observable<TemplateRef<never> | undefined>>(
            (routeComponent: RouteComponent): Observable<TemplateRef<never> | undefined> => toObservable(
              routeComponent.belowTemplateRef$,
              {
                injector: this.injector,
              },
            ),
          ),
          startWith<TemplateRef<never> | undefined, [ TemplateRef<never> | undefined ]>(
            (routerOutlet.component as RouteComponent).belowTemplateRef$(),
          ),
          map<TemplateRef<never> | undefined, TemplateRef<never> | null>(
            (templateRef?: TemplateRef<never>): TemplateRef<never> | null => templateRef || null,
          ),
        ),
      ),
      startWith<TemplateRef<never> | null, [ null ]>(null),
    ),
    {
      requireSync: true,
    },
  );
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
        ({ value }: AbstractControl): ValidationErrors => {
          if (value.password !== value.passwordConfirmation)
            return {
              "passwordConfirmationMatches": true,
            };
          else
            return {};
        },
      ],
    },
  );
  protected readonly signupWithPasskeyFormGroup: FormGroup<{ "email": FormControl<string> }>                                                                    = new FormGroup<{ "email": FormControl<string> }>(
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
    if (isPlatformBrowser(this.platformId))
      this.document.location.href = `/${ localeId }${ this.location.path() }`;
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
  protected signinWithPasskeyFormSubmit(sheetComponent: SheetComponent): void {
    this.authenticationService.signInWithPasskey().then<void>(
      (): void => sheetComponent.openModel$.set(false),
    );
  }
  protected signupFormSubmit(sheetComponent: SheetComponent): void {
    if (this.signupFormGroup.value.email && this.signupFormGroup.value.password)
      this.authenticationService.createUserWithEmailAndPassword(
        this.signupFormGroup.value.email,
        this.signupFormGroup.value.password,
      ).then<void, never>(
        (): void => ((user?: User): void => {
          if (user)
            ((accountDocumentReference: DocumentReference<AccountDocument>): void => {
              if (this.signupFormGroup.value.email)
                updateDoc(
                  accountDocumentReference,
                  {
                    email: this.signupFormGroup.value.email,
                  },
                ).then<void, never>(
                  (): void => {
                    sheetComponent.openModel$.set(false);

                    setTimeout(
                      (): void => this.signupFormGroup.reset(),
                      180,
                    );
                  },
                  (error: unknown): never => {
                    console.error("Something went wrong.");

                    throw error;
                  },
                );
            })(
              doc(
                this.firestore,
                `/accounts/${ user.uid }`,
              ) as DocumentReference<AccountDocument>,
            );
        })(this.authenticationService.user$()),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
  protected signupWithPasskeyFormSubmit(sheetComponent: SheetComponent): void {
    if (this.signupWithPasskeyFormGroup.value.email)
      this.authenticationService.createUserWithPasskey(this.signupWithPasskeyFormGroup.value.email).then<void, never>(
        (): void => ((user?: User): void => {
          if (user)
            ((accountDocumentReference: DocumentReference<AccountDocument>): void => {
              if (this.signupWithPasskeyFormGroup.value.email)
                updateDoc(
                  accountDocumentReference,
                  {
                    email: this.signupWithPasskeyFormGroup.value.email,
                  },
                ).then<void, never>(
                  (): void => {
                    sheetComponent.openModel$.set(false);

                    setTimeout(
                      (): void => this.signupWithPasskeyFormGroup.reset(),
                      180,
                    );
                  },
                  (error: unknown): never => {
                    console.error("Something went wrong.");

                    throw error;
                  },
                );
            })(
              doc(
                this.firestore,
                `/accounts/${ user.uid }`,
              ) as DocumentReference<AccountDocument>,
            );
        })(this.authenticationService.user$()),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }

}
