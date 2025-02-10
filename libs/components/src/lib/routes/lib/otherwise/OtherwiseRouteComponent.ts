import { isPlatformServer }                                                       from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, type OnInit, PLATFORM_ID }   from "@angular/core";
import { Routes }                                                                 from "@angular/router";
import { RESPONSE, STANDARD_ROUTES }                                              from "@standard/injection-tokens";
import { FindRouteByPathPipe }                                                    from "@standard/pipes";
import { PathService }                                                            from "@standard/services";
import { type Response }                                                          from "express";
import { HeaderComponent, HeadingGroupComponent, LabelComponent, RouteComponent } from "../../../../";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      FindRouteByPathPipe,
      HeaderComponent,
      HeadingGroupComponent,
      LabelComponent,
    ],
    styleUrl:        "OtherwiseRouteComponent.sass",
    templateUrl:     "OtherwiseRouteComponent.html",

    standalone: true,
  },
)
export class OtherwiseRouteComponent
  extends RouteComponent
  implements OnInit {

  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly response: Response | null        = inject<Response | null>(
    RESPONSE,
    {
      optional: true,
    },
  );

  protected readonly pathService: PathService = inject<PathService>(PathService);
  protected readonly standardRoutes: Routes   = inject<Routes>(STANDARD_ROUTES);

  public override ngOnInit(): void {
    super.ngOnInit();

    if (isPlatformServer(this.platformId))
      this.response?.status(404);
  }

}
