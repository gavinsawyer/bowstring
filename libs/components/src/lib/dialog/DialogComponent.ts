import { DOCUMENT, isPlatformBrowser }                                                                                                                      from "@angular/common";
import { Component, computed, effect, type EffectCleanupRegisterFn, type ElementRef, inject, model, type ModelSignal, PLATFORM_ID, type Signal, viewChild } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                       from "@angular/core/rxjs-interop";
import { ContainerDirective, FlexboxContainerDirective }                                                                                                    from "@standard/directives";
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll }                                                                                     from "body-scroll-lock";
import { delayWhen, fromEvent, map, type Observable, timer }                                                                                                from "rxjs";


@Component(
  {
    host:           {
      "[class.open]":          "openModelWithTransform$()",
      "[class.openOrClosing]": "openOrClosing$()",
    },
    hostDirectives: [
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "collapsable",
          "columnGap",
          "flexDirection",
          "flexWrap",
          "justifyContent",
          "listenToScrollEvent",
          "rowGap",
        ],
      },
    ],
    selector:       "standard--dialog",
    standalone:     true,
    styleUrls:      [
      "DialogComponent.sass",
    ],
    templateUrl:    "DialogComponent.html",
  },
)
export class DialogComponent {

  constructor() {
    effect(
      (): void => {
        this.containerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
        this.flexboxContainerDirective.htmlElementRef$.set(
          this.htmlDivElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );

    isPlatformBrowser(
      this.platformId,
    ) && effect(
      (effectCleanupRegisterFn: EffectCleanupRegisterFn): void => {
        this.openOrClosing$() ? ((): void => {
          disableBodyScroll(
            this.htmlDialogElementRef$().nativeElement,
          );

          this.htmlDialogElementRef$().nativeElement.showModal();

          setTimeout(
            (): void => this.htmlDialogElementRef$().nativeElement.focus(),
            0,
          );
        })() : ((): void => {
          enableBodyScroll(
            this.htmlDialogElementRef$().nativeElement,
          );

          this.htmlDialogElementRef$().nativeElement.close();
        })();

        effectCleanupRegisterFn(
          (): void => clearAllBodyScrollLocks(),
        );
      },
    );
    fromEvent<KeyboardEvent>(
      this.document,
      "keydown",
    ).pipe<KeyboardEvent>(
      takeUntilDestroyed<KeyboardEvent>(),
    ).subscribe(
      (keyboardEvent: KeyboardEvent): void => this.containerKeydown(keyboardEvent) && void (0),
    );
  }

  private readonly containerDirective: ContainerDirective                       = inject<ContainerDirective>(ContainerDirective);
  private readonly document: Document                                           = inject<Document>(DOCUMENT);
  private readonly flexboxContainerDirective: FlexboxContainerDirective         = inject<FlexboxContainerDirective>(FlexboxContainerDirective);
  private readonly htmlDialogElementRef$: Signal<ElementRef<HTMLDialogElement>> = viewChild.required<ElementRef<HTMLDialogElement>>("htmlDialogElement");
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>       = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly platformId: NonNullable<unknown>                             = inject<NonNullable<unknown>>(PLATFORM_ID);

  protected readonly openModelWithTransform$: Signal<boolean | undefined> = computed<boolean | undefined>(
    (): boolean | undefined => ((open?: "" | boolean | `${ boolean }`): boolean | undefined => open === "" || open === true || open === "true" || open !== "false" && open)(
      this.openModel$(),
    ),
  );
  protected readonly openOrClosing$: Signal<boolean | undefined>          = toSignal<boolean | undefined, undefined>(
    toObservable<boolean | undefined>(
      this.openModelWithTransform$,
    ).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (open?: boolean): Observable<number> => open ? timer(0) : timer(200),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.openModelWithTransform$(),
      ),
    ),
    {
      initialValue: undefined,
    },
  );

  public readonly openModel$: ModelSignal<"" | boolean | `${ boolean }` | undefined> = model<"" | boolean | `${ boolean }` | undefined>(
    false,
    {
      alias: "stuck",
    },
  );

  protected containerKeydown(keyboardEvent: KeyboardEvent): true | void {
    keyboardEvent.key === "Escape" || keyboardEvent.stopPropagation();
    return (keyboardEvent.key === "Escape" && this.openOrClosing$() ? this.openModel$.set(false) : true) || keyboardEvent.preventDefault();
  }

}
