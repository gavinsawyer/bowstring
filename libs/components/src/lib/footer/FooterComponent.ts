import { Component, Signal, signal, WritableSignal } from "@angular/core";
import { toObservable, toSignal }                  from "@angular/core/rxjs-interop";
import { delayWhen, Observable, startWith, timer } from "rxjs";


@Component({
  exportAs:    "standardFooter",
  selector:    "standard--footer",
  standalone:  true,
  styleUrls:   [
    "FooterComponent.sass",
  ],
  templateUrl: "FooterComponent.html",
})
export class FooterComponent {

  public readonly stuck$: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly stuckOrUnsticking$: Signal<boolean> = toSignal<boolean>(
    toObservable<boolean>(
      this.stuck$,
    ).pipe<boolean, boolean>(
      delayWhen<boolean>(
        (stuck: boolean): Observable<number> => stuck ? timer(0) : timer(200),
      ),
      startWith<boolean>(false),
    ),
    {
      requireSync: true,
    },
  );

}
