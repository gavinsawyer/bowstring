import { NgOptimizedImage }                                                                                                                     from "@angular/common";
import { Injector, NgModule }                                                                                                                   from "@angular/core";
import { Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService }                                                from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp }                                                                                       from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }                                                                                        from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                                                                                                           from "@angular/fire/auth";
import { AngularFirestoreModule }                                                                                                               from "@angular/fire/compat/firestore";
import { Firestore, getFirestore, provideFirestore }                                                                                            from "@angular/fire/firestore";
import { Functions, getFunctions, provideFunctions }                                                                                            from "@angular/fire/functions";
import { ReactiveFormsModule }                                                                                                                  from "@angular/forms";
import { BrowserModule, provideClientHydration }                                                                                                from "@angular/platform-browser";
import { BrowserAnimationsModule }                                                                                                              from "@angular/platform-browser/animations";
import { RouterModule }                                                                                                                         from "@angular/router";
import * as brand                                                                                                                               from "@standard/brand";
import { AsideComponent, ButtonComponent, CardComponent, DialogComponent, FooterComponent, FormFieldComponent, HeaderComponent, LinkComponent } from "@standard/components";
import { routes as standardRoutes }                                                                                                             from "@standard/components/routes";
import { BRAND, ENVIRONMENT, GIT_INFO, PACKAGE_VERSION }                                                                                        from "@standard/injection-tokens";
import { AppCheckOptionsService }                                                                                                               from "@standard/services";
import { NgxMaskDirective, provideEnvironmentNgxMask, provideNgxMask }                                                                          from "ngx-mask";
import project                                                                                                                                  from "../../../../project.json";
import { gitInfo }                                                                                                                              from "../../../.git-info";
import { packageVersion }                                                                                                                       from "../../../.package-version";
import { environment }                                                                                                                          from "../../../environment";
import { RootComponent }                                                                                                                        from "../../components";
import { routes as websiteRoutes }                                                                                                              from "../../components/lib/routes";
import { LOCALES }                                                                                                                              from "../../injection tokens";


@NgModule({
  bootstrap:    [
    RootComponent,
  ],
  declarations: [
    RootComponent,
  ],
  imports: [
    AngularFirestoreModule.enablePersistence(),
    AsideComponent,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonComponent,
    CardComponent,
    DialogComponent,
    FooterComponent,
    FormFieldComponent,
    HeaderComponent,
    LinkComponent,
    NgOptimizedImage,
    NgxMaskDirective,
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
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        ...websiteRoutes,
        ...standardRoutes,
      ],
      {
        bindToComponentInputs: true,
        initialNavigation:     "enabledBlocking",
      },
    ),
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
      provide:  LOCALES,
      useValue: ([
        "en-US",
        ...Object.keys(
          project.i18n.locales,
        ),
      ] as (keyof typeof project.i18n.locales | "en-US")[]),
    },
    {
      provide:  PACKAGE_VERSION,
      useValue: packageVersion,
    },
    provideClientHydration(),
    provideEnvironmentNgxMask(),
    provideNgxMask(),
    ScreenTrackingService,
    UserTrackingService,
  ],
})
export class WebsiteBrowserModule {
}
