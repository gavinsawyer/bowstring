import { Component, inject, Signal }               from "@angular/core";
import { toObservable, toSignal }                  from "@angular/core/rxjs-interop";
import { RouterLink, RouterLinkActive }            from "@angular/router";
import * as brand                                  from "@standard/brand";
import { BRAND }                                   from "@standard/injection-tokens";
import { ResponsivityService }                     from "@standard/services";
import { delayWhen, Observable, startWith, timer } from "rxjs";
import { LinkComponent }                           from "../link/LinkComponent";


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

  private readonly responsivityService: ResponsivityService  = inject<ResponsivityService>(ResponsivityService);

  protected readonly brand:             typeof brand    = inject<typeof brand>(BRAND);
  protected readonly raised$:           Signal<boolean> = this.responsivityService.getPastRemScrollPositionSignal(3);
  protected readonly raisedOrLowering$: Signal<boolean> = toSignal<boolean>(
    toObservable<boolean>(
      this.raised$,
    ).pipe<boolean, boolean>(
      delayWhen<boolean>(
        (raised: boolean): Observable<number> => raised ? timer(0) : timer(200),
      ),
      startWith<boolean>(false),
    ),
    {
      requireSync: true,
    },
  );


}
