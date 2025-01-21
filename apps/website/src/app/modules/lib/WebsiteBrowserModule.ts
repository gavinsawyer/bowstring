import { Injector, NgModule }                                                                                                                                                                                                                                                                                                                                                                                                             from "@angular/core";
import { type Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService }                                                                                                                                                                                                                                                                                                                                     from "@angular/fire/analytics";
import { type FirebaseApp, initializeApp, provideFirebaseApp }                                                                                                                                                                                                                                                                                                                                                                            from "@angular/fire/app";
import { type AppCheck, initializeAppCheck, provideAppCheck }                                                                                                                                                                                                                                                                                                                                                                             from "@angular/fire/app-check";
import { type Auth, getAuth, provideAuth }                                                                                                                                                                                                                                                                                                                                                                                                from "@angular/fire/auth";
import { AngularFirestoreModule }                                                                                                                                                                                                                                                                                                                                                                                                         from "@angular/fire/compat/firestore";
import { type Database, getDatabase, provideDatabase }                                                                                                                                                                                                                                                                                                                                                                                    from "@angular/fire/database";
import { type Firestore, getFirestore, provideFirestore }                                                                                                                                                                                                                                                                                                                                                                                 from "@angular/fire/firestore";
import { type Functions, getFunctions, provideFunctions }                                                                                                                                                                                                                                                                                                                                                                                 from "@angular/fire/functions";
import { ReactiveFormsModule }                                                                                                                                                                                                                                                                                                                                                                                                            from "@angular/forms";
import { GoogleMapsModule }                                                                                                                                                                                                                                                                                                                                                                                                               from "@angular/google-maps";
import { BrowserModule }                                                                                                                                                                                                                                                                                                                                                                                                                  from "@angular/platform-browser";
import { provideRouter, RouterOutlet, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling }                                                                                                                                                                                                                                                                                                            from "@angular/router";
import * as brand                                                                                                                                                                                                                                                                                                                                                                                                                         from "@standard/brand";
import { AboveComponent, BannerComponent, BelowComponent, BoxComponent, ButtonComponent, CaptionComponent, DividerComponent, FlexboxContainerComponent, FooterComponent, FormComponent, GridContainerComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, ListComponent, MainComponent, NavComponent, routes as standardRoutes, SectionComponent, SheetComponent, SymbolComponent, TextFieldInputComponent } from "@standard/components";
import * as currencies                                                                                                                                                                                                                                                                                                                                                                                                                    from "@standard/currencies";
import { LinkSymbolDirective, ListItemDirective }                                                                                                                                                                                                                                                                                                                                                                                         from "@standard/directives";
import { APP_ROUTES, BRAND, CURRENCIES, ENVIRONMENT, GIT_INFO_PARTIAL, PACKAGE_VERSION, STANDARD_ROUTES }                                                                                                                                                                                                                                                                                                                                 from "@standard/injection-tokens";
import { FindRouteByPathPipe }                                                                                                                                                                                                                                                                                                                                                                                                            from "@standard/pipes";
import { AppCheckOptionsService }                                                                                                                                                                                                                                                                                                                                                                                                         from "@standard/services";
import project                                                                                                                                                                                                                                                                                                                                                                                                                            from "../../../../project.json";
import { gitInfoPartial }                                                                                                                                                                                                                                                                                                                                                                                                                 from "../../../.gitInfoPartial";
import { packageVersion }                                                                                                                                                                                                                                                                                                                                                                                                                 from "../../../.packageVersion";
import { environment }                                                                                                                                                                                                                                                                                                                                                                                                                    from "../../../environment";
import { RootComponent, routes as appRoutes }                                                                                                                                                                                                                                                                                                                                                                                             from "../../components";
import { LOCALE_IDS }                                                                                                                                                                                                                                                                                                                                                                                                                     from "../../injection tokens";


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
      AboveComponent,
      BannerComponent,
      BelowComponent,
      BoxComponent,
      BrowserModule,
      ButtonComponent,
      CaptionComponent,
      DividerComponent,
      FindRouteByPathPipe,
      FlexboxContainerComponent,
      FooterComponent,
      FormComponent,
      GoogleMapsModule,
      GridContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      LabelComponent,
      LinkComponent,
      LinkSymbolDirective,
      ListComponent,
      ListItemDirective,
      MainComponent,
      NavComponent,
      ReactiveFormsModule,
      RouterOutlet,
      SectionComponent,
      SheetComponent,
      SymbolComponent,
      TextFieldInputComponent,
    ],
    providers:    [
      {
        provide:  APP_ROUTES,
        useValue: appRoutes,
      },
      {
        provide:  BRAND,
        useValue: brand,
      },
      {
        provide:  CURRENCIES,
        useValue: currencies,
      },
      {
        provide:  ENVIRONMENT,
        useValue: environment,
      },
      {
        provide:  GIT_INFO_PARTIAL,
        useValue: gitInfoPartial,
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
      {
        provide:  STANDARD_ROUTES,
        useValue: standardRoutes,
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
      provideDatabase(
        (): Database => getDatabase(),
      ),
      provideFirebaseApp(
        (): FirebaseApp => initializeApp(environment.apis.firebase),
      ),
      provideFirestore(
        (): Firestore => getFirestore(),
      ),
      provideFunctions(
        (): Functions => getFunctions(),
      ),
      provideRouter(
        [
          ...appRoutes,
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
