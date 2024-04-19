import { isPlatformBrowser }                                                                                                                                   from "@angular/common";
import { AfterViewInit, Component, effect, EffectCleanupRegisterFn, EffectRef, ElementRef, inject, OnDestroy, PLATFORM_ID, signal, ViewChild, WritableSignal } from "@angular/core";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks }                                                                                        from "body-scroll-lock";
import { CardComponent }                                                                                                                                       from "../card/CardComponent";


@Component({
  exportAs:    "standardDialog",
  selector:    "standard--dialog",
  standalone:  true,
  styleUrls:   [
    "DialogComponent.sass",
  ],
  templateUrl: "DialogComponent.html",
  imports:     [
    CardComponent,
  ],
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  @ViewChild("htmlDialogElement", {
    read:   ElementRef<HTMLDialogElement>,
    static: true,
  })
  private htmlDialogElementRef?: ElementRef<HTMLDialogElement>;

  private readonly abortController: AbortController      = new AbortController();
  private readonly close:           () => void           = (): void => setTimeout(
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
  private readonly openEffect:      EffectRef            = effect(
    (onCleanup: EffectCleanupRegisterFn): void => {
      isPlatformBrowser(
        this.platformId,
      ) && this.htmlDialogElementRef ? this
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
  private readonly platformId:      NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly closing$: WritableSignal<boolean> = signal<boolean>(false);

  public ngAfterViewInit(): void {
    this
      .htmlDialogElementRef
      ?.nativeElement
      .addEventListener(
        "click",
        this.close,
        {
          signal: this.abortController.signal,
        },
      );

    this
      .htmlDialogElementRef
      ?.nativeElement
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
  public ngOnDestroy():     void {
    this
      .abortController
      .abort();

    this
      .openEffect
      .destroy();
  }

  public readonly open$: WritableSignal<boolean> = signal<boolean>(false);

}
