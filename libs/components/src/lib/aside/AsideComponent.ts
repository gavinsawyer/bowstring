import { DOCUMENT, isPlatformBrowser, NgOptimizedImage } from "@angular/common";
import { Component, inject, PLATFORM_ID }                from "@angular/core";
import { RouterLink, RouterLinkActive }   from "@angular/router";
import { ButtonComponent }                from "../button/ButtonComponent";
import { CapsuleComponent }               from "../capsule/CapsuleComponent";
import { CardComponent }                  from "../card/CardComponent";


@Component({
  imports: [
    ButtonComponent,
    CardComponent,
    RouterLink,
    RouterLinkActive,
    CapsuleComponent,
    NgOptimizedImage,
  ],
  selector:    "standard--aside",
  standalone:  true,
  styleUrls:   [
    "AsideComponent.sass",
  ],
  templateUrl: "AsideComponent.html",
})
export class AsideComponent {

  private readonly document:   Document = inject<Document>(DOCUMENT);
  private readonly platformId: object   = inject<object>(PLATFORM_ID);

  public readonly alert: () => void = (): void => isPlatformBrowser(this.platformId) ? this.document.defaultView?.alert("Button click") : void (0);

}
