import { isPlatformBrowser }                                    from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, type Signal } from "@angular/core";
import { toObservable, toSignal }                               from "@angular/core/rxjs-interop";
import { filter, fromEvent, map }                               from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class PointerService {

  private readonly platformId: NonNullable<unknown>                = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly pointerEvent$: Signal<PointerEvent | undefined> = isPlatformBrowser(this.platformId) ? toSignal<PointerEvent>(
    fromEvent<PointerEvent>(
      window,
      "pointermove",
    ).pipe<PointerEvent>(
      filter<PointerEvent>(
        (pointerEvent: PointerEvent): boolean => pointerEvent.pointerType === "mouse",
      ),
    ),
  ) : signal<undefined>(undefined);

  public readonly position$: Signal<{ "x": number, "y": number } | undefined> = isPlatformBrowser(this.platformId) ? toSignal<{ "x": number, "y": number }>(
    toObservable<PointerEvent | undefined>(this.pointerEvent$).pipe<PointerEvent, { "x": number, "y": number }>(
      filter<PointerEvent | undefined, PointerEvent>(
        (pointerEvent?: PointerEvent): pointerEvent is PointerEvent => !!pointerEvent,
      ),
      map<PointerEvent, { "x": number, "y": number }>(
        (pointerEvent: PointerEvent): { "x": number, "y": number } => ({
          x: pointerEvent.x,
          y: pointerEvent.y,
        }),
      ),
    ),
  ) : signal<undefined>(undefined);
  public readonly pressure$: Signal<number | undefined>                       = isPlatformBrowser(this.platformId) ? toSignal<number>(
    toObservable<PointerEvent | undefined>(this.pointerEvent$).pipe<PointerEvent, number>(
      filter<PointerEvent | undefined, PointerEvent>(
        (pointerEvent?: PointerEvent): pointerEvent is PointerEvent => !!pointerEvent,
      ),
      map<PointerEvent, number>(
        (pointerEvent: PointerEvent): number => pointerEvent.pressure,
      ),
    ),
  ) : signal<undefined>(undefined);

}
