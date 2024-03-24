import { Component, inject, LOCALE_ID } from "@angular/core";
import { GIT_INFO, PACKAGE_VERSION }    from "@standard/injection-tokens";
import { ResponsivityService }          from "@standard/services";
import { GitInfo }                      from "git-describe";


@Component({
  selector:    "standard-website--root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
})
export class RootComponent {

  public readonly gitInfo:             Partial<GitInfo>    = inject<Partial<GitInfo>>(GIT_INFO);
  public readonly localeId:            string              = inject<string>(LOCALE_ID);
  public readonly packageVersion:      string              = inject<string>(PACKAGE_VERSION);
  public readonly responsivityService: ResponsivityService = inject<ResponsivityService>(ResponsivityService);

}
