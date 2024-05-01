import { isPlatformBrowser }                      from "@angular/common";
import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RESPONSE }                               from "@standard/injection-tokens";
import { PathService }                            from "@standard/services";
import { Response }                               from "express";
import { ArticleComponent }                       from "../../../article/ArticleComponent";
import { HeaderComponent }                        from "../../../header/HeaderComponent";
import { HeadingGroupComponent }                  from "../../../heading group/HeadingGroupComponent";
import { RouteComponent }                         from "../../../route/RouteComponent";


@Component({
  imports: [
    ArticleComponent,
    HeaderComponent,
    HeadingGroupComponent,
  ],
  standalone:  true,
  templateUrl: "OtherwiseRouteComponent.html",
})
export class OtherwiseRouteComponent extends RouteComponent implements OnInit {

  private readonly platformId: NonNullable<unknown> = inject<NonNullable<unknown>>(PLATFORM_ID);
  private readonly response:   Response | null      = inject<Response | null>(
    RESPONSE,
    {
      optional: true,
    },
  );

  protected readonly pathService: PathService = inject<PathService>(PathService);

  public override ngOnInit(): void {
    super
      .ngOnInit();

    isPlatformBrowser(this.platformId) || this
      .response
      ?.status(404);
  }

}
