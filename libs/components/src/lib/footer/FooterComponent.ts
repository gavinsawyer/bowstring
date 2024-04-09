import { DOCUMENT, isPlatformBrowser }                                                                          from "@angular/common";
import { Component, ElementRef, inject, PLATFORM_ID, Signal, signal, ViewChild, WritableSignal }                from "@angular/core";
import { toObservable, toSignal }                                                                                      from "@angular/core/rxjs-interop";
import { combineLatest, delayWhen, distinctUntilChanged, EMPTY, filter, fromEvent, map, Observable, startWith, timer } from "rxjs";


@Component({
  exportAs:    "standardFooter",
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host:        {
    "[class.stuck]":                     "stuckOrUnsticking$()",
    "[class.unsticking]":                "stuckOrUnsticking$() && !stuck$()",
    "[style.--container-offset-bottom]": "containerOffsetBottom$() + 'px'",
    "[style.--unsticking-translation]":  "unstickingTranslation$() + 'px'",
  },
  selector:    "standard--footer",
  standalone:  true,
  styleUrls:   [
    "FooterComponent.sass",
  ],
  templateUrl: "FooterComponent.html",
})
export class FooterComponent {

  @ViewChild("footerHtmlElement", {
    read:   ElementRef<HTMLElement>,
    static: true,
  })
  private readonly footerHtmlElementRef?: ElementRef<HTMLElement>;

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
  protected readonly containerOffsetBottom$:  Signal<number>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    combineLatest<{ bodyOffsetHeight: Observable<number>, stuck: Observable<boolean>, stuckOrUnsticking: Observable<boolean> }>(
      {
        bodyOffsetHeight:  this.document.defaultView ? fromEvent<Event>(
          this.document.defaultView,
          "resize",
        ).pipe<number, number, number>(
          map<Event, number>(
            (): number => this.document.body.offsetHeight,
          ),
          startWith<number, [ number ]>(
            this.document.body.offsetHeight,
          ),
          distinctUntilChanged<number>(),
        ) : EMPTY,
        stuck:             toObservable<boolean>(
          this.stuck$,
        ),
        stuckOrUnsticking: toObservable<boolean>(
          this.stuckOrUnsticking$,
        ),
      },
    ).pipe<{ bodyOffsetHeight: number, stuck: boolean, stuckOrUnsticking: true }, number, number, number>(
      filter<{ bodyOffsetHeight: number, stuck: boolean, stuckOrUnsticking: boolean }, { bodyOffsetHeight: number, stuck: boolean, stuckOrUnsticking: true }>(
        (latest: { bodyOffsetHeight: number, stuck: boolean, stuckOrUnsticking: boolean }): latest is { bodyOffsetHeight: number, stuck: boolean, stuckOrUnsticking: true } => latest.stuckOrUnsticking,
      ),
      map<{ bodyOffsetHeight: number, stuck: boolean, stuckOrUnsticking: true }, number>(
        (): number => this.document.body.offsetHeight - (this.footerHtmlElementRef?.nativeElement.parentElement?.offsetHeight || 0) - (this.footerHtmlElementRef?.nativeElement.parentElement?.offsetTop || 0),
      ),
      startWith<number, [ number ]>(
        this.document.body.offsetHeight - (this.footerHtmlElementRef?.nativeElement.parentElement?.offsetHeight || 0) - (this.footerHtmlElementRef?.nativeElement.offsetTop || 0),
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<number>(0);
  protected readonly unstickingTranslation$:  Signal<number> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    combineLatest<{ scrollY: Observable<number>, stuck: Observable<boolean>, stuckOrUnsticking: Observable<boolean> }>(
      {
        scrollY:           this.document.defaultView ? fromEvent<Event>(
          this.document,
          "scroll",
        ).pipe<number, number, number>(
          map<Event, number>(
            (): number => this.document.defaultView?.scrollY || 0,
          ),
          startWith<number, [ number ]>(
            this.document.defaultView.scrollY,
          ),
          distinctUntilChanged<number>(),
        ) : EMPTY,
        stuck:             toObservable<boolean>(
          this.stuck$,
        ),
        stuckOrUnsticking: toObservable<boolean>(
          this.stuckOrUnsticking$,
        ),
      },
    ).pipe<{ scrollY: number, stuck: boolean, stuckOrUnsticking: true }, number, number, number>(
      filter<{ scrollY: number, stuck: boolean, stuckOrUnsticking: boolean }, { scrollY: number, stuck: boolean, stuckOrUnsticking: true }>(
        (latest: { scrollY: number, stuck: boolean, stuckOrUnsticking: boolean }): latest is { scrollY: number, stuck: boolean, stuckOrUnsticking: true } => latest.stuckOrUnsticking,
      ),
      map<{ scrollY: number, stuck: boolean, stuckOrUnsticking: true }, number>(
        (): number => this.document.body.offsetHeight - (this.document.defaultView?.scrollY || 0) - (this.document.defaultView?.innerHeight || 0),
      ),
      startWith<number, [ number ]>(
        this.document.body.offsetHeight - (this.document.defaultView?.scrollY || 0) - (this.document.defaultView?.innerHeight || 0),
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<number>(0);

}
