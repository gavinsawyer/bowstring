import { Component }                    from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ButtonComponent }              from "../button/ButtonComponent";


@Component({
  imports: [
    ButtonComponent,
    RouterLink,
    RouterLinkActive,
  ],
  selector:    "standard--aside",
  standalone:  true,
  styleUrls:   [
    "AsideComponent.sass",
  ],
  templateUrl: "AsideComponent.html",
})
export class AsideComponent {
}
