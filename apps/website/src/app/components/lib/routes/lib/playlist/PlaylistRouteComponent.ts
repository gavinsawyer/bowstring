import { Component }                                                                                                                                                                 from "@angular/core";
import { ArticleComponent, ButtonComponent, CardComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LinkComponent, ListComponent, ListItemComponent, RouteComponent } from "@standard/components";


@Component({
  imports: [
    ArticleComponent,
    ButtonComponent,
    CardComponent,
    HeaderComponent,
    HeadingGroupComponent,
    LinkComponent,
    ListComponent,
    ListItemComponent,
    ImageComponent,
  ],
  standalone:  true,
  templateUrl: "PlaylistRouteComponent.html",
})
export class PlaylistRouteComponent extends RouteComponent { }
