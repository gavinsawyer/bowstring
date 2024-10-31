import { Injector, NgModule }                                                                                                                                                                                                                                                                                                                                                                          from "@angular/core";
import { type Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService }                                                                                                                                                                                                                                                                                                  from "@angular/fire/analytics";
import { type FirebaseApp, initializeApp, provideFirebaseApp }                                                                                                                                                                                                                                                                                                                                         from "@angular/fire/app";
import { type AppCheck, initializeAppCheck, provideAppCheck }                                                                                                                                                                                                                                                                                                                                          from "@angular/fire/app-check";
import { type Auth, getAuth, provideAuth }                                                                                                                                                                                                                                                                                                                                                             from "@angular/fire/auth";
import { AngularFirestoreModule }                                                                                                                                                                                                                                                                                                                                                                      from "@angular/fire/compat/firestore";
import { type Firestore, getFirestore, provideFirestore }                                                                                                                                                                                                                                                                                                                                              from "@angular/fire/firestore";
import { type Functions, getFunctions, provideFunctions }                                                                                                                                                                                                                                                                                                                                              from "@angular/fire/functions";
import { ReactiveFormsModule }                                                                                                                                                                                                                                                                                                                                                                         from "@angular/forms";
import { GoogleMapsModule }                                                                                                                                                                                                                                                                                                                                                                            from "@angular/google-maps";
import { BrowserModule }                                                                                                                                                                                                                                                                                                                                                                               from "@angular/platform-browser";
import { provideRouter, RouterOutlet, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling }                                                                                                                                                                                                                                                                         from "@angular/router";
import * as brand                                                                                                                                                                                                                                                                                                                                                                                      from "@standard/brand";
import { AboveComponent, BelowComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, FooterComponent, FormComponent, GridContainerComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, ListComponent, MainComponent, NavComponent, routes as standardRoutes, SectionComponent, SheetComponent, SymbolComponent, TextFieldInputComponent } from "@standard/components";
import { ListItemDirective }                                                                                                                                                                                                                                                                                                                                                                           from "@standard/directives";
import { BRAND, ENVIRONMENT, GIT_INFO, PACKAGE_VERSION }                                                                                                                                                                                                                                                                                                                                               from "@standard/injection-tokens";
import { AppCheckOptionsService }                                                                                                                                                                                                                                                                                                                                                                      from "@standard/services";
import project                                                                                                                                                                                                                                                                                                                                                                                         from "../../../../project.json";
import { gitInfo }                                                                                                                                                                                                                                                                                                                                                                                     from "../../../.git-info";
import { packageVersion }                                                                                                                                                                                                                                                                                                                                                                              from "../../../.package-version";
import { environment }                                                                                                                                                                                                                                                                                                                                                                                 from "../../../environment";
import { RootComponent, routes as websiteRoutes }                                                                                                                                                                                                                                                                                                                                                      from "../../components";
import { LOCALE_IDS }                                                                                                                                                                                                                                                                                                                                                                                  from "../../injection tokens";


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
      BelowComponent,
      BoxComponent,
      ButtonComponent,
      BrowserModule,
      DividerComponent,
      FlexboxContainerComponent,
      FooterComponent,
      FormComponent,
      GoogleMapsModule,
      GridContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      LabelComponent,
      LinkComponent,
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
