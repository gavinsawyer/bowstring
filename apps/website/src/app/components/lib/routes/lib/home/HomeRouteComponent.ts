import { DatePipe, NgOptimizedImage }   from "@angular/common";
import { Component, inject, LOCALE_ID } from "@angular/core";
import { CapsuleComponent, CardComponent, RouteComponent } from "@standard/components";
import { i18n }                                            from "../../../../../../../project.json";


@Component({
  imports: [
    CapsuleComponent,
    CardComponent,
    DatePipe,
    NgOptimizedImage,
  ],
  standalone:  true,
  templateUrl: "./HomeRouteComponent.html",
})
export class HomeRouteComponent extends RouteComponent {

  public readonly localeId: keyof typeof i18n.locales | "en-US" = inject<keyof typeof i18n.locales | "en-US">(LOCALE_ID);
  public readonly now:      Date                                = new Date();

}
