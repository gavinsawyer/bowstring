import { Component, inject, Input, LOCALE_ID }                                                                     from "@angular/core";
import * as brand                                                                                                  from "@standard/brand";
import { FlexboxComponent, FooterComponent as _FooterComponent, HeaderComponent, LinkComponent, SectionComponent } from "@standard/components";
import { BRAND, GIT_INFO, PACKAGE_VERSION }                                                                        from "@standard/injection-tokens";
import { ResponsivityService }                                                                                     from "@standard/services";
import { GitInfo }                                                                                                 from "git-describe";
import { LocaleId }                                                                                                from "../../../types";
import { LocaleDialogComponent }                                                                                   from "../locale dialog/LocaleDialogComponent";


@Component({
  imports:     [
    _FooterComponent,
    FlexboxComponent,
    HeaderComponent,
    LinkComponent,
    SectionComponent,
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

  protected readonly brand:                typeof brand        = inject<typeof brand>(BRAND);
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
