import { Component }                                                                                                                                                                                   from "@angular/core";
import { ArticleComponent, ButtonComponent, CardComponent, FlexboxComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LinkComponent, ListComponent, ListItemComponent, RouteComponent } from "@standard/components";


@Component({
  imports:        [
    ArticleComponent,
    ButtonComponent,
    CardComponent,
    FlexboxComponent,
    HeaderComponent,
    HeadingGroupComponent,
    LinkComponent,
    ListComponent,
    ListItemComponent,
    ImageComponent,
  ],
  standalone:     true,
  templateUrl:    "PlaylistRouteComponent.html",
})
export class PlaylistRouteComponent extends RouteComponent { }
