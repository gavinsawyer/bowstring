import { DOCUMENT, isPlatformBrowser, Location }                                                                                                                            from "@angular/common";
import { Component, effect, EffectCleanupRegisterFn, EffectRef, ElementRef, inject, Injector, Input, LOCALE_ID, OnDestroy, PLATFORM_ID, signal, ViewChild, WritableSignal } from "@angular/core";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks }                                                                                                     from "body-scroll-lock";
import project                                                                                                                                                              from "../../../../../project.json";
import { LOCALES }                                                                                                                                                          from "../../../injection tokens";


@Component({
  selector:    "standard-website--locale-dialog",
  styleUrls:   [
    "./LocaleDialogComponent.sass",
  ],
  templateUrl: "./LocaleDialogComponent.html",
})
export class LocaleDialogComponent implements OnDestroy {

  @ViewChild(
    "dialog",
    {
      read:   ElementRef,
      static: true,
    },
  )
  private dialog!: ElementRef<HTMLDialogElement>;

  private readonly document:   Document  = inject<Document>(DOCUMENT);
  private readonly location:   Location  = inject<Location>(Location);
  private readonly openEffect: EffectRef = effect(
    (effectCleanupRegisterFn: EffectCleanupRegisterFn): void => {
      this
        .open$() ? ((): void => {
          this
            .dialog
            .nativeElement
            .showModal();

          disableBodyScroll(this.dialog.nativeElement);
        })() : ((): void => {
          this
            .dialog
            .nativeElement
            .close();

          enableBodyScroll(this.dialog.nativeElement)
        })();

      effectCleanupRegisterFn(
        clearAllBodyScrollLocks,
      );
    },
    {
      injector: inject<Injector>(Injector),
    },
  )
  private readonly platformId: string    = inject<string>(PLATFORM_ID);

  public readonly changeLocale: (locale: keyof typeof project.i18n.locales | "en-US") => void = (locale: keyof typeof project.i18n.locales | "en-US"): void => isPlatformBrowser(this.platformId) ? ((): void => {
    this
      .document
      .location
      .href = "/" + locale + this
      .location
      .path();
  })() : void (0);
  public readonly close:        () => void                                                    = (): void => setTimeout(
    (): void => {
      this
        .closing$
        .set(false);

      this
        .open$
        .set(false);
    },
    200,
  ) && this
    .closing$
    .set(true);
  public readonly closing$:     WritableSignal<boolean>                                       = signal<boolean>(false);
  public readonly localeId:     keyof typeof project.i18n.locales | "en-US"                   = inject<keyof typeof project.i18n.locales | "en-US">(LOCALE_ID);
  public readonly locales:      (keyof typeof project.i18n.locales | "en-US")[]               = inject<(keyof typeof project.i18n.locales | "en-US")[]>(LOCALES);

  @Input({
    required: true,
  })
  public open$!: WritableSignal<boolean>;

  ngOnDestroy(): void {
    this
      .openEffect
      .destroy();
  }

}
