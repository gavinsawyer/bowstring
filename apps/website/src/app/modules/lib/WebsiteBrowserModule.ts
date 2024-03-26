import { NgClass, NgOptimizedImage }                                                                                                                  from "@angular/common";
import { Injector, NgModule }                                                                                                                         from "@angular/core";
import { Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService }                                                      from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp }                                                                                             from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }                                                                                              from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                                                                                                                 from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }                                                                                                  from "@angular/fire/firestore";
import { Functions, getFunctions, provideFunctions }                                                                                                  from "@angular/fire/functions";
import { BrowserModule, provideClientHydration }                                                                                                      from "@angular/platform-browser";
import { BrowserAnimationsModule }                                                                                                                    from "@angular/platform-browser/animations";
import { RouterModule }                                                                                                                               from "@angular/router";
import { AsideComponent, ButtonComponent, CardComponent, FooterComponent, HeaderComponent, LinkComponent, routes as standardRoutes, SymbolComponent } from "@standard/components";
import { ENVIRONMENT, GIT_INFO, PACKAGE_VERSION, SYMBOLS }                                                                                            from "@standard/injection-tokens";
import { AppCheckOptionsService }                                                                                                                     from "@standard/services";
import project                                                                                                                                        from "../../../../project.json";
import { gitInfo }                                                                                                                                    from "../../../.git-info";
import { packageVersion }                                                                                                                             from "../../../.package-version";
import { environment }                                                                                                                                from "../../../environment";
import { symbols }                                                                                                                                    from "../../../symbols";
import { LocaleDialogComponent, RootComponent, routes as websiteRoutes }                                                                              from "../../components";
import { LOCALES }                                                                                                                                    from "../../injection tokens";


@NgModule({
  bootstrap:    [
    RootComponent,
  ],
  declarations: [
    LocaleDialogComponent,
    RootComponent,
  ],
  imports: [
    AsideComponent,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonComponent,
    CardComponent,
    FooterComponent,
    HeaderComponent,
    LinkComponent,
    SymbolComponent,
    NgClass,
    NgOptimizedImage,
    provideAnalytics(
      (): Analytics => getAnalytics(),
    ),
    provideAppCheck(
      (injector: Injector): AppCheck => initializeAppCheck(
        undefined,
        injector.get(AppCheckOptionsService).appCheckOptions,
      ),
    ),
    provideAuth(
      (): Auth => getAuth(),
    ),
    provideFirebaseApp(
      (): FirebaseApp => initializeApp(environment.firebase),
    ),
    provideFirestore(
      (): Firestore => getFirestore(),
    ),
    provideFunctions(
      (): Functions => getFunctions(),
    ),
    RouterModule.forRoot(
      [
        ...websiteRoutes,
        ...standardRoutes,
      ],
      {
        bindToComponentInputs:     true,
        initialNavigation:         "enabledBlocking",
        scrollPositionRestoration: "enabled",
      },
    ),
  ],
  providers:    [
    {
      provide:  ENVIRONMENT,
      useValue: environment,
    },
    {
      provide:  GIT_INFO,
      useValue: gitInfo,
    },
    {
      provide:  LOCALES,
      useValue: ([
        "en-US",
        ...Object.keys(project.i18n.locales),
      ] as (keyof typeof project.i18n.locales | "en-US")[]),
    },
    {
      provide:  PACKAGE_VERSION,
      useValue: packageVersion,
    },
    {
      provide:  SYMBOLS,
      useValue: symbols,
    },
    provideClientHydration(),
    ScreenTrackingService,
    UserTrackingService,
  ],
})
export class WebsiteBrowserModule {
}
