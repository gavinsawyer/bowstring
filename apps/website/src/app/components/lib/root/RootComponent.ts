import { Component, inject, LOCALE_ID }     from "@angular/core";
import { FlexboxContainerDirective }        from "@standard/directives";
import { BRAND, GIT_INFO, PACKAGE_VERSION } from "@standard/injection-tokens";
import { ResponsivityService }              from "@standard/services";
import { type Brand }                       from "@standard/types";
import { type GitInfo }                     from "git-describe";
import { type LocaleId }                    from "../../../types";


@Component(
  {
    hostDirectives: [
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

  protected readonly brand: Brand                             = inject<Brand>(BRAND);
  protected readonly gitInfo: Partial<GitInfo>                = inject<Partial<GitInfo>>(GIT_INFO);
  protected readonly localeId: LocaleId                       = inject<LocaleId>(LOCALE_ID);
  protected readonly localeDisplayNames: Intl.DisplayNames    = new Intl.DisplayNames(
    [
      this.localeId,
    ],
    {
      type: "language",
    },
  );
  protected readonly packageVersion: string                   = inject<string>(PACKAGE_VERSION);
  protected readonly responsivityService: ResponsivityService = inject<ResponsivityService>(ResponsivityService);

}
