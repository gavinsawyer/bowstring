import { isPlatformBrowser }                                                           from "@angular/common";
import { inject, Injectable, PLATFORM_ID }                                             from "@angular/core";
import { AppCheckOptions, AppCheckToken, CustomProvider, ReCaptchaEnterpriseProvider } from "@angular/fire/app-check";
import { ENVIRONMENT }                                                                 from "@standard/injection-tokens";
import { Environment }                                                                 from "@standard/interfaces";


@Injectable({
  providedIn: "root",
})
export class AppCheckOptionsService {

  private readonly environment: Environment          = inject<Environment>(ENVIRONMENT);
  private readonly platformId:  NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly appCheckOptions: AppCheckOptions = isPlatformBrowser(
    this.platformId,
  ) ? {
    isTokenAutoRefreshEnabled: true,
    provider:                  new ReCaptchaEnterpriseProvider(
      this.environment.recaptchaKeyID,
    ),
  } : {
    isTokenAutoRefreshEnabled: false,
    provider:                  new CustomProvider(
      {
        getToken: (): Promise<AppCheckToken> => Promise.resolve(
          {
            token:            process.env["APP_CHECK_TOKEN_" + this.environment.project.toUpperCase()] as string,
            expireTimeMillis: Date.now(),
          },
        ),
      },
    ),
  };

}
