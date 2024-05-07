import { Directive, signal, WritableSignal } from "@angular/core";


@Directive({
  standalone: true,
})
export class TranslationHoverDirective {

  public readonly pointerdown:          () => void                                                     = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && this.transitionTranslate$.set(true);
  public readonly pointerenter:         () => void                                                     = (): void => setTimeout(
    (): void => this.transitionTranslate$.set(false),
    200,
  ) && void (0);
  public readonly pointerleave:         () => void                                                     = (): void => {
    this
      .transitionTranslate$
      .set(true);

    this
      .translation$
      .set(
        {
          x: 0,
          y: 0,
        },
      );
  };
  public readonly pointermove:          (pointerEvent: PointerEvent, htmlElement: HTMLElement) => void = (pointerEvent: PointerEvent, htmlElement: HTMLElement): void => pointerEvent.pointerType === "mouse" ? ((domRect: DOMRect): void => this.translation$.set(
    {
      x: ((2 * ((pointerEvent.clientX - domRect.left) / domRect.width)) - 1) / 8,
      y: ((2 * ((pointerEvent.clientY - domRect.top) / domRect.height)) - 1) / 8,
    },
  ))(
    htmlElement.getBoundingClientRect(),
  ) : void (0);
  public readonly transitionTranslate$: WritableSignal<boolean>                                        = signal<boolean>(true);
  public readonly translation$:         WritableSignal<{ x: number, y: number }>                       = signal<{ x: number, y: number }>(
    {
      x: 0,
      y: 0,
    },
  );

}
