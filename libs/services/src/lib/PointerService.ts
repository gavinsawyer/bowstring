import { isPlatformBrowser }                               from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toObservable, toSignal }                          from "@angular/core/rxjs-interop";
import { filter, fromEvent, map }                          from "rxjs";


@Injectable(
  {
    providedIn: "root",
  },
)
export class PointerService {

  private readonly platformId: NonNullable<unknown>          = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly events$: Signal<PointerEvent | undefined> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<PointerEvent | undefined, undefined>(
    fromEvent<PointerEvent>(
      window,
      "pointermove",
    ).pipe<PointerEvent>(
      filter<PointerEvent>(
        (pointerEvent: PointerEvent): boolean => pointerEvent.pointerType === "mouse",
      ),
    ),
    {
      initialValue: undefined,
    },
  ) : signal<undefined>(undefined);

  public readonly position$: Signal<{ "x": number, "y": number }> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<{ "x": number, "y": number }, { "x": 0, "y": 0 }>(
    toObservable<PointerEvent | undefined>(
      this.events$,
    ).pipe<{ "x": number, "y": number }>(
      map<PointerEvent | undefined, { "x": number, "y": number }>(
        (pointerEvent?: PointerEvent): { "x": number, "y": number } => ({
          x: pointerEvent?.x || 0,
          y: pointerEvent?.y || 0,
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
  ) ? toSignal<number | undefined, undefined>(
    toObservable<PointerEvent | undefined>(
      this.events$,
    ).pipe<number | undefined>(
      map<PointerEvent | undefined, number | undefined>(
        (pointerEvent?: PointerEvent): number | undefined => pointerEvent?.pressure,
      ),
    ),
    {
      initialValue: undefined,
    },
  ) : signal<undefined>(undefined);

}
