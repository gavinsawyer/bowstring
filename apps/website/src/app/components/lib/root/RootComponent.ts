import { DOCUMENT, isPlatformBrowser, Location }                                                                                  from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Injector, LOCALE_ID, PLATFORM_ID, type Signal, type TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                 from "@angular/core/rxjs-interop";
import { doc, type DocumentData, type DocumentReference, Firestore, setDoc }                                                      from "@angular/fire/firestore";
import { Functions, httpsCallable }                                                                                               from "@angular/fire/functions";
import { type AbstractControl, FormControl, FormGroup, type ValidationErrors, Validators }                                        from "@angular/forms";
import { RouterOutlet }                                                                                                           from "@angular/router";
import { type RouteComponent, type SheetComponent }                                                                               from "@standard/components";
import { CanvasDirective, FlexboxContainerDirective }                                                                             from "@standard/directives";
import { BRAND, GIT_INFO_PARTIAL, PACKAGE_VERSION }                                                                               from "@standard/injection-tokens";
import { type AccountDocument }                                                                                                   from "@standard/interfaces";
import { AuthenticationService, ResponsivityService }                                                                             from "@standard/services";
import { type Brand }                                                                                                             from "@standard/types";
import { type GitInfo }                                                                                                           from "git-describe";
import { map, type Observable, startWith, switchMap }                                                                             from "rxjs";
import { LOCALE_IDS }                                                                                                             from "../../../injection tokens";
import { type LocaleId }                                                                                                          from "../../../types";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
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
    selector:        "standard-website--root",
    standalone:      false,
    styleUrls:       [
      "RootComponent.sass",
    ],
    templateUrl:     "RootComponent.html",
  },
)
export class RootComponent {

  private readonly document: Document                  = inject<Document>(DOCUMENT);
  private readonly firestore: Firestore                = inject<Firestore>(Firestore);
  private readonly functions: Functions                = inject<Functions>(Functions);
  private readonly injector: Injector                  = inject<Injector>(Injector);
  private readonly location: Location                  = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown>    = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly routerOutlet$: Signal<RouterOutlet> = viewChild.required<RouterOutlet>(RouterOutlet);

  protected readonly aboveTemplateRef$: Signal<TemplateRef<never> | null>                                                                                       = toSignal<TemplateRef<never> | null>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<never> | null, TemplateRef<never> | null>(
      switchMap<RouterOutlet, Observable<TemplateRef<never> | null>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<never> | null> => routerOutlet.activateEvents.asObservable().pipe<TemplateRef<never> | undefined, TemplateRef<never> | undefined, TemplateRef<never> | null>(
          switchMap<RouteComponent, Observable<TemplateRef<never> | undefined>>(
            ({ aboveTemplateRef$ }: RouteComponent): Observable<TemplateRef<never> | undefined> => toObservable<TemplateRef<never> | undefined>(
              aboveTemplateRef$,
              {
                injector: this.injector,
              },
            ),
          ),
          startWith<TemplateRef<never> | undefined, [ TemplateRef<never> | undefined ]>((routerOutlet.component as RouteComponent).aboveTemplateRef$()),
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
  protected readonly bannerTemplateRef$: Signal<TemplateRef<never> | null>                                                                                      = toSignal<TemplateRef<never> | null>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<never> | null, TemplateRef<never> | null>(
      switchMap<RouterOutlet, Observable<TemplateRef<never> | null>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<never> | null> => routerOutlet.activateEvents.asObservable().pipe<TemplateRef<never> | undefined, TemplateRef<never> | undefined, TemplateRef<never> | null>(
          switchMap<RouteComponent, Observable<TemplateRef<never> | undefined>>(
            ({ bannerTemplateRef$ }: RouteComponent): Observable<TemplateRef<never> | undefined> => toObservable<TemplateRef<never> | undefined>(
              bannerTemplateRef$,
              {
                injector: this.injector,
              },
            ),
          ),
          startWith<TemplateRef<never> | undefined, [ TemplateRef<never> | undefined ]>((routerOutlet.component as RouteComponent).bannerTemplateRef$()),
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
  protected readonly belowTemplateRef$: Signal<TemplateRef<never> | null>                                                                                       = toSignal<TemplateRef<never> | null>(
    toObservable<RouterOutlet>(this.routerOutlet$).pipe<TemplateRef<never> | null, TemplateRef<never> | null>(
      switchMap<RouterOutlet, Observable<TemplateRef<never> | null>>(
        (routerOutlet: RouterOutlet): Observable<TemplateRef<never> | null> => routerOutlet.activateEvents.asObservable().pipe<TemplateRef<never> | undefined, TemplateRef<never> | undefined, TemplateRef<never> | null>(
          switchMap<RouteComponent, Observable<TemplateRef<never> | undefined>>(
            ({ belowTemplateRef$ }: RouteComponent): Observable<TemplateRef<never> | undefined> => toObservable<TemplateRef<never> | undefined>(
              belowTemplateRef$,
              {
                injector: this.injector,
              },
            ),
          ),
          startWith<TemplateRef<never> | undefined, [ TemplateRef<never> | undefined ]>((routerOutlet.component as RouteComponent).belowTemplateRef$()),
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
  protected readonly gitInfoPartial: Partial<GitInfo>                                                                                                           = inject<Partial<GitInfo>>(GIT_INFO_PARTIAL);
  protected readonly localeId: LocaleId                                                                                                                         = inject<LocaleId>(LOCALE_ID);
  protected readonly localeIds: LocaleId[]                                                                                                                      = inject<LocaleId[]>(LOCALE_IDS);
  protected readonly localeDisplayNames: Intl.DisplayNames                                                                                                      = new Intl.DisplayNames(
    [
      this.localeId as string,
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
        ({ value }: AbstractControl): ValidationErrors => value.password !== value.passwordConfirmation ? {
          "passwordConfirmationMatches": true,
        } : {},
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
      this.document.location.href = `/${ String(localeId) }${ this.location.path() }`;
  }
  protected signinFormSubmit(openModel$: SheetComponent["openModel$"]): void {
    if (this.signinFormGroup.value.email && this.signinFormGroup.value.password)
      this.authenticationService.signInWithEmailAndPassword(
        this.signinFormGroup.value.email,
        this.signinFormGroup.value.password,
      ).then<void>(
        (): void => {
          openModel$.set(false);

          setTimeout(
            (): void => this.signinFormGroup.reset(),
            180,
          );
        },
      );
  }
  protected signinWithPasskeyFormSubmit(openModel$: SheetComponent["openModel$"]): void {
    this.authenticationService.signInWithPasskey().then<void>(
      (): void => openModel$.set(false),
    );
  }
  protected signupFormSubmit(openModel$: SheetComponent["openModel$"]): void {
    if (this.signupFormGroup.value.email && this.signupFormGroup.value.password)
      this.authenticationService.createUserWithEmailAndPassword(
        this.signupFormGroup.value.email,
        this.signupFormGroup.value.password,
      ).then<void, never>(
        (): void => {
          openModel$.set(false);

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
  }
  protected signupWithPasskeyFormSubmit(openModel$: SheetComponent["openModel$"]): void {
    const userId: string | undefined = this.authenticationService.user$()?.uid;

    if (userId && this.signupWithPasskeyFormGroup.value.email) {
      setDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ userId }`,
        ) as DocumentReference<AccountDocument>,
        {
          email: this.signupWithPasskeyFormGroup.value.email,
        },
        {
          merge: true,
        },
      ).then<void, never>(
        (): Promise<void> => httpsCallable<null, null>(
          this.functions,
          "createStripeCustomer",
        )().then<void, never>(
          (): Promise<void> => this.authenticationService.linkWithPasskey().then<void, never>(
            (): void => {
              openModel$.set(false);

              setTimeout(
                (): void => this.signupWithPasskeyFormGroup.reset(),
                180,
              );
            },
            (error: unknown): never => {
              console.error("Something went wrong.");

              throw error;
            },
          ),
          (error: unknown): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
    }
  }

}
