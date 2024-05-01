import { DatePipe }                                                                                                                                                     from "@angular/common";
import { Component, inject, LOCALE_ID }                                                                                                                                 from "@angular/core";
import { ArticleComponent, ButtonComponent, CapsuleComponent, CardComponent, FlexboxComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, RouteComponent } from "@standard/components";
import { LocaleId }                                                                                                                                                     from "../../../../../types";


@Component({
  imports: [
    ArticleComponent,
    ButtonComponent,
    CapsuleComponent,
    CardComponent,
    DatePipe,
    FlexboxComponent,
    HeaderComponent,
    HeadingGroupComponent,
    ImageComponent,
  ],
  standalone:  true,
  templateUrl: "HomeRouteComponent.html",
})
export class HomeRouteComponent extends RouteComponent {

  protected readonly localeId: LocaleId = inject<LocaleId>(LOCALE_ID);
  protected readonly now:      Date     = new Date();

}
