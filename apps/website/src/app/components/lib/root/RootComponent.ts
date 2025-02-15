import { DOCUMENT, isPlatformBrowser }                                                                                            from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Injector, LOCALE_ID, PLATFORM_ID, type Signal, type TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal }                                                                                                 from "@angular/core/rxjs-interop";
import { AppCheck, type AppCheckTokenResult, getLimitedUseToken }                                                                 from "@angular/fire/app-check";
import { RouterOutlet, type Routes }                                                                                              from "@angular/router";
import type * as brandLib                                                                                                         from "@bowstring/brand";
import { type RouteComponent }                                                                                                    from "@bowstring/components";
import type * as currenciesLib                                                                                                    from "@bowstring/currencies";
import { CanvasDirective, FlexboxContainerDirective }                                                                             from "@bowstring/directives";
import { APP_ROUTES, BOWSTRING_ROUTES, BRAND, CURRENCIES, ENVIRONMENT, GIT_INFO_PARTIAL, PACKAGE_VERSION }                        from "@bowstring/injection-tokens";
import { type Environment }                                                                                                       from "@bowstring/interfaces";
import { AuthenticationService, ConnectivityService, ExchangeService, ResponsivityService }                                       from "@bowstring/services";
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
    selector:        "bowstring-website--root",
    standalone:      false,
    styleUrl:        "RootComponent.sass",
    templateUrl:     "RootComponent.html",
  },
)
export class RootComponent {

  private readonly appCheck: AppCheck                  = inject<AppCheck>(AppCheck);
  private readonly document: Document                  = inject<Document>(DOCUMENT);
  private readonly environment: Environment            = inject<Environment>(ENVIRONMENT);
  private readonly injector: Injector                  = inject<Injector>(Injector);
  private readonly platformId: NonNullable<unknown>    = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly routerOutlet$: Signal<RouterOutlet> = viewChild.required<RouterOutlet>(RouterOutlet);

  protected readonly aboveTemplateRef$: Signal<TemplateRef<never> | null>  = toSignal<TemplateRef<never> | null>(
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
  protected readonly appRoutes: Routes                                     = inject<Routes>(APP_ROUTES);
  protected readonly authenticationService: AuthenticationService          = inject<AuthenticationService>(AuthenticationService);
  protected readonly bannerTemplateRef$: Signal<TemplateRef<never> | null> = toSignal<TemplateRef<never> | null>(
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
  protected readonly belowTemplateRef$: Signal<TemplateRef<never> | null>  = toSignal<TemplateRef<never> | null>(
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
  protected readonly brand: typeof brandLib                                = inject<typeof brandLib>(BRAND);
  protected readonly connectivityService: ConnectivityService              = inject<ConnectivityService>(ConnectivityService);
  protected readonly currencies: typeof currenciesLib                      = inject<typeof currenciesLib>(CURRENCIES);
  protected readonly currencyKeys: (keyof typeof currenciesLib)[]          = Object.keys(this.currencies) as (keyof typeof currenciesLib)[];
  protected readonly exchangeService: ExchangeService                      = inject<ExchangeService>(ExchangeService);
  protected readonly gitInfoPartial: Partial<GitInfo>                      = inject<Partial<GitInfo>>(GIT_INFO_PARTIAL);
  protected readonly localeId: LocaleId                                    = inject<LocaleId>(LOCALE_ID);
  protected readonly localeIds: LocaleId[]                                 = inject<LocaleId[]>(LOCALE_IDS);
  protected readonly localeDisplayNames: Intl.DisplayNames                 = new Intl.DisplayNames(
    [
      this.localeId as string,
    ],
    {
      type: "language",
    },
  );
  protected readonly packageVersion: string                                = inject<string>(PACKAGE_VERSION);
  protected readonly responsivityService: ResponsivityService              = inject<ResponsivityService>(ResponsivityService);
  protected readonly bowstringRoutes: Routes                               = inject<Routes>(BOWSTRING_ROUTES);

  protected async changeLocale(localeId: LocaleId): Promise<void> {
    if (isPlatformBrowser(this.platformId))
      return getLimitedUseToken(this.appCheck).then<void, never>(
        ({ token }: AppCheckTokenResult): void => {
          this.document.location.href = `https://us-central1-${ this.environment.apis.firebase.projectId }.cloudfunctions.net/redirect?appCheckToken=${ encodeURI(token) }&url=${ encodeURI(`${ this.document.location.origin }/${ String(localeId) }/${ this.document.location.pathname.split("/").slice(2).join("/") }`) }`;
        },
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
}
