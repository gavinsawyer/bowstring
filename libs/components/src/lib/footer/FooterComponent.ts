import { Component, inject }         from "@angular/core";
import { GIT_INFO, PACKAGE_VERSION } from "@standard/injection-tokens";
import { GitInfo }                   from "git-describe";
import { LinkComponent }             from "../link/LinkComponent";


@Component({
  imports:     [
    LinkComponent,
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
  public readonly packageVersion: string           = inject<string>(PACKAGE_VERSION);

}
