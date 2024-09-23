import { Injector, NgModule, provideExperimentalZonelessChangeDetection }                                                                                                                                                                            from "@angular/core";
import { type Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService }                                                                                                                                                from "@angular/fire/analytics";
import { type FirebaseApp, initializeApp, provideFirebaseApp }                                                                                                                                                                                       from "@angular/fire/app";
import { type AppCheck, initializeAppCheck, provideAppCheck }                                                                                                                                                                                        from "@angular/fire/app-check";
import { type Auth, getAuth, provideAuth }                                                                                                                                                                                                           from "@angular/fire/auth";
import { AngularFirestoreModule }                                                                                                                                                                                                                    from "@angular/fire/compat/firestore";
import { type Firestore, getFirestore, provideFirestore }                                                                                                                                                                                            from "@angular/fire/firestore";
import { type Functions, getFunctions, provideFunctions }                                                                                                                                                                                            from "@angular/fire/functions";
import { ReactiveFormsModule }                                                                                                                                                                                                                       from "@angular/forms";
import { BrowserModule, provideClientHydration, withEventReplay, withI18nSupport }                                                                                                                                                                   from "@angular/platform-browser";
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling }                                                                                                                                     from "@angular/router";
import * as brand                                                                                                                                                                                                                                    from "@standard/brand";
import { ButtonComponent, CardComponent, FlexboxContainerComponent, FooterComponent, GridContainerComponent, HeaderComponent, HeadingGroupComponent, LinkComponent, MainComponent, NavComponent, SectionComponent, SheetComponent, SymbolComponent } from "@standard/components";
import { BRAND, ENVIRONMENT, GIT_INFO, PACKAGE_VERSION }                                                                                                                                                                                             from "@standard/injection-tokens";
import { routes as standardRoutes }                                                                                                                                                                                                                  from "@standard/route-components";
import { AppCheckOptionsService }                                                                                                                                                                                                                    from "@standard/services";
import { SigninSheetContentsComponent, SignupSheetContentsComponent }                                                                                                                                                                                from "@standard/sheet-contents-components";
import { NgxMaskDirective, provideEnvironmentNgxMask, provideNgxMask }                                                                                                                                                                               from "ngx-mask";
import project                                                                                                                                                                                                                                       from "../../../../project.json";
import { gitInfo }                                                                                                                                                                                                                                   from "../../../.git-info";
import { packageVersion }                                                                                                                                                                                                                            from "../../../.package-version";
import { environment }                                                                                                                                                                                                                               from "../../../environment";
import { RootComponent }                                                                                                                                                                                                                             from "../../components";
import { LOCALE_IDS }                                                                                                                                                                                                                                from "../../injection tokens";
import { routes as websiteRoutes }                                                                                                                                                                                                                   from "../../route components";
import { LocaleSheetContentsComponent }                                                                                                                                                                                                              from "../../sheet contents components";


@NgModule(
  {
    bootstrap:    [
      RootComponent,
    ],
    declarations: [
      RootComponent,
    ],
    imports:      [
      AngularFirestoreModule.enablePersistence(),
      ButtonComponent,
      BrowserModule,
      CardComponent,
      FlexboxContainerComponent,
      FooterComponent,
      GridContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      LinkComponent,
      LocaleSheetContentsComponent,
      MainComponent,
      NavComponent,
      NgxMaskDirective,
      ReactiveFormsModule,
      SectionComponent,
      SheetComponent,
      SigninSheetContentsComponent,
      SignupSheetContentsComponent,
      SymbolComponent,
    ],
    providers:    [
      {
        provide:  BRAND,
        useValue: brand,
      },
      {
        provide:  ENVIRONMENT,
        useValue: environment,
      },
      {
        provide:  GIT_INFO,
        useValue: gitInfo,
      },
      {
        provide:  LOCALE_IDS,
        useValue: [
          "en-US",
          ...Object.keys(
            project.i18n.locales,
          ),
        ],
      },
      {
        provide:  PACKAGE_VERSION,
        useValue: packageVersion,
      },
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
      provideClientHydration(
        withEventReplay(),
        withI18nSupport(),
      ),
      provideExperimentalZonelessChangeDetection(),
      provideEnvironmentNgxMask(),
      provideFirebaseApp(
        (): FirebaseApp => initializeApp(environment.firebase),
      ),
      provideFirestore(
        (): Firestore => getFirestore(),
      ),
      provideFunctions(
        (): Functions => getFunctions(),
      ),
      provideNgxMask(),
      provideRouter(
        [
          ...websiteRoutes,
          ...standardRoutes,
        ],
        withComponentInputBinding(),
        withEnabledBlockingInitialNavigation(),
        withInMemoryScrolling(
          {
            scrollPositionRestoration: "enabled",
          },
        ),
      ),
      ScreenTrackingService,
      UserTrackingService,
    ],
  },
)
export class WebsiteBrowserModule {
}
