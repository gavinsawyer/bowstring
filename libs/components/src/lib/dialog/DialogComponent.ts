import { isPlatformBrowser }                                                                                                                                          from "@angular/common";
import { AfterViewInit, Component, effect, EffectCleanupRegisterFn, EffectRef, ElementRef, inject, Input, OnDestroy, PLATFORM_ID, signal, ViewChild, WritableSignal } from "@angular/core";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks }                                                                                               from "body-scroll-lock";
import { CardComponent }                                                                                                                                              from "../card/CardComponent";


@Component({
  selector:    "standard--dialog",
  standalone:  true,
  styleUrls:   [
    "./DialogComponent.sass",
  ],
  templateUrl: "./DialogComponent.html",
  imports:     [
    CardComponent,
  ],
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  @Input({
    required: true,
  })
  public open$!: WritableSignal<boolean>;

  @ViewChild("htmlDialogElement", {
    read:   ElementRef,
    static: true,
  })
  private htmlDialogElementRef!: ElementRef<HTMLDialogElement>;

  private readonly abortController: AbortController = new AbortController();
  private readonly close:           () => void      = (): void => setTimeout(
    (): void => {
      this
        .closing$
        .set(false);

      this
        .open$
        .set(false);
    },
    200,
  ) && this.closing$.set(true);
  private readonly openEffect:      EffectRef       = effect(
    (onCleanup: EffectCleanupRegisterFn): void => {
      isPlatformBrowser(
        this.platformId,
      ) ? this
        .open$() ? ((): void => {
          this
            .htmlDialogElementRef
            .nativeElement
            .showModal();

          disableBodyScroll(
            this.htmlDialogElementRef.nativeElement,
          );
        })() : ((): void => {
          this
            .htmlDialogElementRef
            .nativeElement
            .close();

          enableBodyScroll(
            this.htmlDialogElementRef.nativeElement,
          );
        })() : void (0);

      onCleanup(
        (): void => isPlatformBrowser(
          this.platformId,
        ) ? clearAllBodyScrollLocks() : void (0),
      );
    },
    {
      manualCleanup: true,
    },
  );
  private readonly platformId:      string          = inject<string>(PLATFORM_ID);

  public readonly closing$: WritableSignal<boolean> = signal<boolean>(false);

  ngAfterViewInit(): void {
    this
      .htmlDialogElementRef
      .nativeElement
      .addEventListener(
        "click",
        this.close,
        {
          signal: this.abortController.signal,
        },
      );

    this
      .htmlDialogElementRef
      .nativeElement
      .addEventListener(
        "keydown",
        (keyboardEvent: KeyboardEvent): void => keyboardEvent.key === "Escape" ? ((): void => {
          keyboardEvent
            .preventDefault();

          this
            .close();
        })() : void (0),
        {
          signal: this.abortController.signal,
        },
      );
  }

  ngOnDestroy(): void {
    this
      .abortController
      .abort();

    this
      .openEffect
      .destroy();
  }

}
