import { Component, inject }            from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import * as brand                       from "@standard/brand";
import { BRAND }                        from "@standard/injection-tokens";
import { LinkComponent }                from "../link/LinkComponent";


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

  public readonly brand: typeof brand = inject<typeof brand>(BRAND);

}
