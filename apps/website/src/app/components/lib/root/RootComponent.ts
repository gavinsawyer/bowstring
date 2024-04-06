import { DOCUMENT, isPlatformBrowser, Location }                        from "@angular/common";
import { Component, inject, LOCALE_ID, PLATFORM_ID, Signal, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators }                           from "@angular/forms";
import { DialogComponent }                                              from "@standard/components";
import { GIT_INFO, PACKAGE_VERSION }                                    from "@standard/injection-tokens";
import { ResponsivityService }                                          from "@standard/services";
import { GitInfo }                                                      from "git-describe";
import project                                                          from "../../../../../project.json";
import { LOCALES }                                                      from "../../../injection tokens";
import { ConnectFormGroup }                                             from "../../../interfaces";


@Component({
  selector:    "standard-website--root",
  styleUrls:   [
    "RootComponent.sass",
  ],
  templateUrl: "RootComponent.html",
})
export class RootComponent {

  @ViewChild("localeDialogComponent", {
    read: DialogComponent,
  })
  private localeDialogComponent!: DialogComponent;

  private readonly document:   Document             = inject<Document>(DOCUMENT);
  private readonly location:   Location             = inject<Location>(Location);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly changeLocale:         (locale: keyof typeof project.i18n.locales | "en-US") => void = (locale: keyof typeof project.i18n.locales | "en-US"): void => isPlatformBrowser(
    this.platformId,
  ) ? ((): void => {
    this
      .document
      .location
      .href = "/" + locale + this
      .location
      .path();
  })() : void (0);
  protected readonly connectFormGroup:     FormGroup<ConnectFormGroup>                                   = new FormGroup<ConnectFormGroup>(
    {
      email:   new FormControl<string>(
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
      name:    new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  Validators.required,
        },
      ),
      phone:   new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  Validators.required,
        },
      ),
    },
  );
  protected readonly connectFormSubmit:    () => void                                                    = (): void => console.log(
    this.connectFormGroup.value,
  );
  protected readonly gitInfo:              Partial<GitInfo>                                              = inject<Partial<GitInfo>>(GIT_INFO);
  protected readonly localeId:             keyof typeof project.i18n.locales | "en-US"                   = inject<keyof typeof project.i18n.locales | "en-US">(LOCALE_ID);
  protected readonly localeDisplayNames:   Intl.DisplayNames                                             = new Intl.DisplayNames(
    [
      this.localeId,
    ],
    {
      type: "language",
    },
  );
  protected readonly locales:              (keyof typeof project.i18n.locales | "en-US")[]               = inject<(keyof typeof project.i18n.locales | "en-US")[]>(LOCALES);
  protected readonly packageVersion:       string                                                        = inject<string>(PACKAGE_VERSION);
  protected readonly responsivityService:  ResponsivityService                                           = inject<ResponsivityService>(ResponsivityService);
  protected readonly past46remBreakpoint$: Signal<boolean>                                               = this.responsivityService.getPastRemBreakpointSignal(46);

}
