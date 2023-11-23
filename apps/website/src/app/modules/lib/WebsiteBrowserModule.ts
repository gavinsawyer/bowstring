import { NgClass }                                                                                     from "@angular/common";
import { Injector, NgModule }                                                                          from "@angular/core";
import { Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService }       from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp }                                              from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }                                               from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                                                                  from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }                                                   from "@angular/fire/firestore";
import { Functions, getFunctions, provideFunctions }                                                   from "@angular/fire/functions";
import { BrowserModule, provideClientHydration }                                                       from "@angular/platform-browser";
import { BrowserAnimationsModule }                                                                     from "@angular/platform-browser/animations";
import { RouterModule, RouterOutlet }                                                                  from "@angular/router";
import { AsideComponent, ButtonComponent, FooterComponent, HeaderComponent, routes as standardRoutes } from "@standard/components";
import { ENVIRONMENT, GIT_INFO, PACKAGE_VERSION }                                                      from "@standard/injection-tokens";
import { AppCheckOptionsService }                                                                      from "@standard/services";
import { gitInfo }                                                                                     from "../../../.git-info";
import { packageVersion }                                                                              from "../../../.package-version";
import { environment }                                                                                 from "../../../environment";
import { RootComponent, routes as websiteRoutes }                                                      from "../../components";


@NgModule({
  bootstrap:    [
    RootComponent,
  ],
  declarations: [
    RootComponent,
  ],
  imports:      [
    AsideComponent,
    BrowserAnimationsModule,
    BrowserModule,
    FooterComponent,
    HeaderComponent,
    NgClass,
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
    RouterOutlet,
    ButtonComponent,
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
      provide:  PACKAGE_VERSION,
      useValue: packageVersion,
    },
    provideClientHydration(),
    ScreenTrackingService,
    UserTrackingService,
  ],
})
export class WebsiteBrowserModule {
}
