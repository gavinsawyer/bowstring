import { DOCUMENT, isPlatformBrowser, Location }                                     from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID, Signal, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, Validators }                                        from "@angular/forms";
import { GIT_INFO, PACKAGE_VERSION }                                                 from "@standard/injection-tokens";
import { ResponsivityService }                                                       from "@standard/services";
import { GitInfo }                                                                   from "git-describe";
import project                                                                       from "../../../../../project.json";
import { LOCALES }                                                                   from "../../../injection tokens";
import { ConnectFormGroup }                                                          from "../../../interfaces";


@Component({
  selector:    "standard-website--root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
})
export class RootComponent {

  private readonly document:            Document            = inject<Document>(DOCUMENT);
  private readonly location:            Location            = inject<Location>(Location);
  private readonly platformId:          string              = inject<string>(PLATFORM_ID);
  private readonly responsivityService: ResponsivityService = inject<ResponsivityService>(ResponsivityService)

  public readonly changeLocale:        (locale: keyof typeof project.i18n.locales | "en-US") => void = (locale: keyof typeof project.i18n.locales | "en-US"): void => isPlatformBrowser(this.platformId) ? ((): void => {
    this
      .document
      .location
      .href = "/" + locale + this
      .location
      .path();
  })() : void (0);
  public readonly connectFormGroup:    FormGroup<ConnectFormGroup> = new FormGroup<ConnectFormGroup>(
    {
      email: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
      message: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  Validators.required,
        },
      ),
      name: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  Validators.required,
        },
      ),
      phone: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  Validators.required,
        },
      ),
    },
  );
  public readonly gitInfo:             Partial<GitInfo>                                              = inject<Partial<GitInfo>>(GIT_INFO);
  public readonly localeDialogOpen$:   WritableSignal<boolean>                                       = signal<boolean>(false);
  public readonly largeBreakpoint$:    Signal<boolean>                                               = this.responsivityService.getBreakpointSignal("46rem");
  public readonly localeId:            keyof typeof project.i18n.locales | "en-US"                   = inject<keyof typeof project.i18n.locales | "en-US">(LOCALE_ID);
  public readonly locales:             (keyof typeof project.i18n.locales | "en-US")[]               = inject<(keyof typeof project.i18n.locales | "en-US")[]>(LOCALES);
  public readonly mediumBreakpoint$:   Signal<boolean>                                               = this.responsivityService.getBreakpointSignal("23.5rem");
  public readonly packageVersion:      string                                                        = inject<string>(PACKAGE_VERSION);

}
