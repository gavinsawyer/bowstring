import { DOCUMENT, isPlatformBrowser }                                                                     from "@angular/common";
import { Component, computed, ElementRef, inject, PLATFORM_ID, Signal, signal, ViewChild, WritableSignal } from "@angular/core";
import { toObservable, toSignal }                                                                                             from "@angular/core/rxjs-interop";
import { combineLatest, delayWhen, distinctUntilChanged, EMPTY, filter, fromEvent, map, merge, Observable, startWith, timer } from "rxjs";


@Component({
  exportAs:    "standardFooter",
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host:        {
    "[class.lowering]":                  "(stuckOrUnsticking$() && !stuck$()) || (raisedOrLowering$() && !raised$())",
    "[class.raised]":                    "stuckOrUnsticking$() && raisedOrLowering$()",
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

  protected readonly bodyOffsetHeight$:      Signal<number>  = toSignal<number>(
    merge<[ number, number ]>(
      this.document.defaultView ? fromEvent<Event>(
        this.document.defaultView,
        "resize",
      ).pipe<number>(
        map<Event, number>(
          (): number => this.document.body.offsetHeight,
        ),
      ) : EMPTY,
      toObservable<boolean>(
        this.stuck$
      ).pipe<number>(
        map<boolean, number>(
          (): number => this.document.body.offsetHeight,
        ),
      ),
    ).pipe<number, number>(
      startWith<number, [ number ]>(
        this.document.body.offsetHeight,
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  );
  protected readonly stuckOrUnsticking$:     Signal<boolean> = toSignal<boolean>(
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
  protected readonly containerOffsetBottom$: Signal<number>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    toObservable<number>(
      this.bodyOffsetHeight$,
    ).pipe<number, number, number, number>(
      filter<number>(
        (): boolean => this.footerHtmlElementRef?.nativeElement.parentElement ? getComputedStyle(
          this.footerHtmlElementRef.nativeElement.parentElement,
        ).getPropertyValue("position") === "static" : false,
      ),
      map<number, number>(
        (bodyOffsetHeight: number): number => bodyOffsetHeight - (this.footerHtmlElementRef?.nativeElement.parentElement?.offsetHeight || 0) - (this.footerHtmlElementRef?.nativeElement.parentElement?.offsetTop || 0) - (this.footerHtmlElementRef?.nativeElement.parentElement ? ((bottomPropertyValue: string): number => bottomPropertyValue.includes("px") ? Number(
          bottomPropertyValue.replace(
            "px",
            "",
          ),
        ) : 0)(
          getComputedStyle(
            this.footerHtmlElementRef?.nativeElement.parentElement,
          ).getPropertyValue("bottom"),
        ) : 0),
      ),
      startWith<number, [ number ]>(
        this.document.body.offsetHeight - (this.footerHtmlElementRef?.nativeElement.parentElement?.offsetHeight || 0) - (this.footerHtmlElementRef?.nativeElement.parentElement?.offsetTop || 0) - (this.footerHtmlElementRef?.nativeElement.parentElement ? ((bottomPropertyValue: string): number => bottomPropertyValue.includes("px") ? Number(
          bottomPropertyValue.replace(
            "px",
            "",
          ),
        ) : 0)(
          getComputedStyle(
            this.footerHtmlElementRef?.nativeElement.parentElement,
          ).getPropertyValue("bottom"),
        ) : 0),
      ),
      distinctUntilChanged<number>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<number>(0);
  protected readonly unstickingTranslation$: Signal<number>  = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<number>(
    combineLatest<{ bodyOffsetHeight: Observable<number>, containerOffsetBottom: Observable<number>, scrollY: Observable<number>, stuckOrUnsticking: Observable<boolean> }>(
      {
        bodyOffsetHeight:      toObservable<number>(
          this.bodyOffsetHeight$,
        ),
        containerOffsetBottom: toObservable<number>(
          this.containerOffsetBottom$,
        ),
        scrollY:               fromEvent<Event>(
          this.document,
          "scroll",
        ).pipe<number, number, number>(
          map<Event, number>(
            (): number => this.document.defaultView?.scrollY || 0,
          ),
          startWith<number, [ number ]>(
            this.document.defaultView?.scrollY || 0,
          ),
          distinctUntilChanged<number>(),
        ),
        stuckOrUnsticking:     toObservable<boolean>(
          this.stuckOrUnsticking$,
        ),
      },
    ).pipe<{ bodyOffsetHeight: number, containerOffsetBottom: number, scrollY: number, stuckOrUnsticking: true }, number, number, number>(
      filter<{ bodyOffsetHeight: number, containerOffsetBottom: number, scrollY: number, stuckOrUnsticking: boolean }, { bodyOffsetHeight: number, containerOffsetBottom: number, scrollY: number, stuckOrUnsticking: true }>(
        (latest: { bodyOffsetHeight: number, containerOffsetBottom: number, scrollY: number, stuckOrUnsticking: boolean }): latest is { bodyOffsetHeight: number, containerOffsetBottom: number, scrollY: number, stuckOrUnsticking: true } => latest.stuckOrUnsticking,
      ),
      map<{ bodyOffsetHeight: number, containerOffsetBottom: number, scrollY: number, stuckOrUnsticking: true }, number>(
        (latest: { bodyOffsetHeight: number, containerOffsetBottom: number, scrollY: number, stuckOrUnsticking: true }): number => Math.max(
          latest.bodyOffsetHeight - latest.scrollY - (this.document.defaultView?.innerHeight || 0) - latest.containerOffsetBottom,
          0,
        ),
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
  protected readonly raised$:                Signal<boolean> = toSignal<boolean>(
    toObservable<number>(
      this.unstickingTranslation$,
    ).pipe<boolean, boolean, boolean>(
      map<number, boolean>(
        (unstickingTranslation: number): boolean => unstickingTranslation !== 0,
      ),
      startWith<boolean, [ boolean ]>(false),
      distinctUntilChanged<boolean>(),
    ),
    {
      requireSync: true,
    },
  );
  protected readonly raisedOrLowering$:      Signal<boolean> = toSignal<boolean>(
    toObservable<boolean>(
      this.raised$,
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
