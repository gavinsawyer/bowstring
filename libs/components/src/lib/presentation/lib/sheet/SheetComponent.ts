import { DOCUMENT, isPlatformBrowser, NgTemplateOutlet }                                                                                                                         from "@angular/common";
import { afterRender, Component, computed, effect, type EffectCleanupRegisterFn, type ElementRef, inject, model, type ModelSignal, PLATFORM_ID, signal, type Signal, viewChild } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal }                                                                                                                            from "@angular/core/rxjs-interop";
import { ElevatedDirective, FlexboxContainerDirective, GlassDirective, RoundedDirective }                                                                                        from "@standard/directives";
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll }                                                                                                          from "body-scroll-lock";
import { delayWhen, fromEvent, map, type Observable, timer }                                                                                                                     from "rxjs";


@Component(
  {
    host:           {
      "[class.openOrClosing]": "openOrClosing$()",
      "[class.open]":          "openModelWithTransform$()",
    },
    hostDirectives: [
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
      {
        directive: GlassDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--sheet",
    standalone:     true,
    styleUrls:      [
      "SheetComponent.sass",
    ],
    templateUrl:    "SheetComponent.html",
  },
)
export class SheetComponent {

  constructor() {
    afterRender(
      (): void => this.roundedContainerDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );

    if (isPlatformBrowser(this.platformId))
      effect(
        (effectCleanupRegisterFn: EffectCleanupRegisterFn): void => {
          if (this.openOrClosing$())
            ((): void => {
              disableBodyScroll(this.htmlDialogElementRef$().nativeElement);

              this.htmlDialogElementRef$().nativeElement.showModal();

              setTimeout(
                (): void => this.htmlDialogElementRef$().nativeElement.focus(),
                0,
              );
            })();
          else
            ((): void => {
              enableBodyScroll(this.htmlDialogElementRef$().nativeElement);

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
      (keyboardEvent: KeyboardEvent): void => {
        this.containerKeydown(keyboardEvent);
      },
    );
  }

  private readonly document: Document                                           = inject<Document>(DOCUMENT);
  private readonly htmlDialogElementRef$: Signal<ElementRef<HTMLDialogElement>> = viewChild.required<ElementRef<HTMLDialogElement>>("htmlDialogElement");
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>       = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly platformId: NonNullable<unknown>                             = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly openModelWithTransform$: Signal<boolean | undefined> = computed<boolean | undefined>(
    (): boolean | undefined => ((open?: "" | boolean | `${ boolean }`): boolean | undefined => {
      if (open !== undefined)
        return open === "" || open === true || open === "true" || open !== "false" && false;
      else
        return undefined;
    })(this.openModel$()),
  );

  protected readonly openOrClosing$: Signal<boolean | undefined> = isPlatformBrowser(this.platformId) ? toSignal<boolean | undefined>(
    toObservable<boolean | undefined>(this.openModelWithTransform$).pipe<boolean | undefined, boolean | undefined>(
      delayWhen<boolean | undefined>(
        (open?: boolean): Observable<number> => open ? timer(0) : timer(180),
      ),
      map<boolean | undefined, boolean | undefined>(
        (): boolean | undefined => this.openModelWithTransform$(),
      ),
    ),
  ) : signal<undefined>(undefined);
  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

  public readonly openModel$: ModelSignal<"" | boolean | `${ boolean }` | undefined> = model<"" | boolean | `${ boolean }` | undefined>(
    false,
    {
      alias: "open",
    },
  );

  protected containerKeydown(keyboardEvent: KeyboardEvent): true | void {
    if (keyboardEvent.key !== "Escape")
      keyboardEvent.stopPropagation();

    return (keyboardEvent.key === "Escape" && this.openOrClosing$() ? this.openModel$.set(false) : true) || keyboardEvent.preventDefault();
  }

}
