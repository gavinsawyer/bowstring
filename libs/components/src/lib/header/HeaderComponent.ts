import { isPlatformBrowser }                              from "@angular/common";
import { Component, inject, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toObservable, toSignal }                         from "@angular/core/rxjs-interop";
import { RouterLink, RouterLinkActive }                   from "@angular/router";
import * as brand                                         from "@standard/brand";
import { BRAND }                                          from "@standard/injection-tokens";
import { ResponsivityService }                            from "@standard/services";
import { delayWhen, Observable, startWith, timer }        from "rxjs";
import { LinkComponent }                                  from "../link/LinkComponent";


@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    LinkComponent,
  ],
  selector:    "standard--header",
  standalone:  true,
  styleUrls:   [
    "HeaderComponent.sass",
  ],
  templateUrl: "HeaderComponent.html",
})
export class HeaderComponent {

  private readonly platformId:          NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly responsivityService: ResponsivityService  = inject<ResponsivityService>(ResponsivityService);

  public readonly brand:             typeof brand    = inject<typeof brand>(BRAND);
  public readonly raised$:           Signal<boolean> = this.responsivityService.getPastRemScrollPositionSignal(3);
  public readonly raisedOrLowering$: Signal<boolean> = isPlatformBrowser(
    this.platformId,
  ) ? toSignal<boolean>(
    toObservable<boolean>(
      this.responsivityService.getPastRemScrollPositionSignal(3),
    ).pipe<boolean, boolean>(
      delayWhen<boolean>(
        (raised: boolean): Observable<number> => raised ? timer(0) : timer(200),
      ),
      startWith<boolean>(false),
    ),
    {
      requireSync: true,
    },
  ) : signal<boolean>(false);


}
