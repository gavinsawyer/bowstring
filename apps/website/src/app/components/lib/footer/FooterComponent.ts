import { Component, inject, Input, LOCALE_ID }                from "@angular/core";
import { FooterComponent as _FooterComponent, LinkComponent } from "@standard/components";
import { GIT_INFO, PACKAGE_VERSION }                          from "@standard/injection-tokens";
import { ResponsivityService }                                from "@standard/services";
import { GitInfo }                                            from "git-describe";
import { LocaleId }                                           from "../../../types";
import { LocaleDialogComponent }                              from "../locale dialog/LocaleDialogComponent";


@Component({
  imports:     [
    _FooterComponent,
    LinkComponent,
  ],
  selector:    "standard-website--footer",
  standalone:  true,
  styleUrls:   [
    "FooterComponent.sass",
  ],
  templateUrl: "FooterComponent.html",
})
export class FooterComponent {

  @Input() public localeDialogComponent?: LocaleDialogComponent;

  protected readonly gitInfo:              Partial<GitInfo>    = inject<Partial<GitInfo>>(GIT_INFO);
  protected readonly localeId:             LocaleId            = inject<LocaleId>(LOCALE_ID);
  protected readonly localeDisplayNames:   Intl.DisplayNames   = new Intl.DisplayNames(
    [
      this.localeId,
    ],
    {
      type: "language",
    },
  );
  protected readonly packageVersion:       string              = inject<string>(PACKAGE_VERSION);
  protected readonly responsivityService:  ResponsivityService = inject<ResponsivityService>(ResponsivityService);

}
