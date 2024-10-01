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

  private readonly platformId: NonNullable<unknown>     = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly events$: Signal<PointerEvent | null> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<PointerEvent | null, null>(
    fromEvent<PointerEvent>(
      window,
      "pointermove",
    ).pipe<PointerEvent>(
      filter<PointerEvent>(
        (pointerEvent: PointerEvent): boolean => pointerEvent.pointerType === "mouse",
      ),
    ),
    {
      initialValue: null,
    },
  ) : signal<null>(null);

  public readonly position$: Signal<{ "x": number, "y": number }> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<{ "x": number, "y": number }, { "x": 0, "y": 0 }>(
    toObservable<PointerEvent | null>(
      this.events$,
    ).pipe<PointerEvent, { "x": number, "y": number }>(
      filter<PointerEvent | null, PointerEvent>(
        (pointerEvent: PointerEvent | null): pointerEvent is PointerEvent => !!pointerEvent,
      ),
      map<PointerEvent, { "x": number, "y": number }>(
        (pointerEvent: PointerEvent): { "x": number, "y": number } => ({
          x: pointerEvent.x,
          y: pointerEvent.y,
        }),
      ),
    ),
    {
      initialValue: {
        x: 0,
        y: 0,
      },
    },
  ) : signal<{ "x": 0, "y": 0 }>(
    {
      x: 0,
      y: 0,
    },
  );
  public readonly pressure$: Signal<number | undefined>           = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    toObservable<PointerEvent | null>(
      this.events$,
    ).pipe<PointerEvent, number>(
      filter<PointerEvent | null, PointerEvent>(
        (pointerEvent: PointerEvent | null): pointerEvent is PointerEvent => !!pointerEvent,
      ),
      map<PointerEvent, number>(
        (pointerEvent: PointerEvent): number => pointerEvent.pressure,
      ),
    ),
    {
      initialValue: undefined,
    },
  ) : signal<undefined>(undefined);

}
