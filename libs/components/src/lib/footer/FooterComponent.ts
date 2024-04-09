import { DOCUMENT, isPlatformBrowser }                                                                          from "@angular/common";
import { Component, inject, PLATFORM_ID, Signal, signal, WritableSignal }                                       from "@angular/core";
import { toObservable, toSignal }                                                                               from "@angular/core/rxjs-interop";
import { combineLatest, delayWhen, distinctUntilChanged, filter, fromEvent, map, Observable, startWith, timer } from "rxjs";


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

  private readonly document:   Document             = inject<Document>(DOCUMENT);
  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);

  public readonly stuck$: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly stuckOrUnsticking$:      Signal<boolean> = toSignal<boolean>(
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
  protected readonly unstickingTranslationY$: Signal<number> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    combineLatest<{ stuck: Observable<boolean>, stuckOrUnsticking: Observable<boolean>, scrollY: Observable<number> }>(
      {
        stuck:             toObservable<boolean>(
          this.stuck$,
        ),
        stuckOrUnsticking: toObservable<boolean>(
          this.stuckOrUnsticking$,
        ),
        scrollY:           fromEvent<Event>(
          this.document,
          "scroll",
        ).pipe<number, number, number>(
          map<Event, number>(
            (): number => this.document.defaultView?.scrollY || 0,
          ),
          startWith<number, [ number ]>(0),
          distinctUntilChanged<number>(),
        ),
      },
    ).pipe<{ stuck: boolean, stuckOrUnsticking: true, scrollY: number }, number, number, number>(
      filter<{ stuck: boolean, stuckOrUnsticking: boolean, scrollY: number }, { stuck: boolean, stuckOrUnsticking: true, scrollY: number }>(
        (latest: { stuck: boolean, stuckOrUnsticking: boolean, scrollY: number }): latest is { stuck: boolean, stuckOrUnsticking: true, scrollY: number } => latest.stuckOrUnsticking,
      ),
      map<{ stuck: boolean, stuckOrUnsticking: true, scrollY: number }, number>(
        (latest: { stuck: boolean, stuckOrUnsticking: true, scrollY: number }): number => this.document.defaultView ? this.document.body.offsetHeight - (latest.scrollY + this.document.defaultView.innerHeight) : 0,
      ),
      startWith<number, [ number ]>(
        this.document.defaultView ? this.document.body.offsetHeight - this.document.defaultView.innerHeight : 0,
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<number>(0);

}
