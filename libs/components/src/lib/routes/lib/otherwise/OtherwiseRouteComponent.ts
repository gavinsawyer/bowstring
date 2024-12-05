import { isPlatformServer }                                                     from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, type OnInit, PLATFORM_ID } from "@angular/core";
import { RESPONSE }                                                             from "@standard/injection-tokens";
import { PathService }                                                          from "@standard/services";
import { type Response }                                                        from "express";
import { HeaderComponent, HeadingGroupComponent, RouteComponent }               from "../../../../";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      HeaderComponent,
      HeadingGroupComponent,
    ],
    styleUrls:       [
      "OtherwiseRouteComponent.sass",
    ],
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

  public override ngOnInit(): void {
    super.ngOnInit();

    if (isPlatformServer(this.platformId))
      this.response?.status(404);
  }

}
