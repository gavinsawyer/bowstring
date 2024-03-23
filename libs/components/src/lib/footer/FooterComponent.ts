import { Component, inject, LOCALE_ID } from "@angular/core";
import { GIT_INFO, PACKAGE_VERSION }    from "@standard/injection-tokens";
import { GitInfo }                      from "git-describe";
import { SymbolComponent }              from "../symbol/SymbolComponent";
import { LinkComponent }                from "../link/LinkComponent";


@Component({
  imports: [
    LinkComponent,
    SymbolComponent,
  ],
  selector:    "standard--footer",
  standalone:  true,
  styleUrls:   [
    "FooterComponent.sass",
  ],
  templateUrl: "FooterComponent.html",
})
export class FooterComponent {

  public readonly gitInfo:        Partial<GitInfo> = inject<Partial<GitInfo>>(GIT_INFO);
  public readonly localeId:       string           = inject<string>(LOCALE_ID);
  public readonly packageVersion: string           = inject<string>(PACKAGE_VERSION);

}
