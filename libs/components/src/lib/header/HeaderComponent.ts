import { Component }                    from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { subtitle, title }              from "@standard/brand";


@Component({
  imports:     [
    RouterLink,
    RouterLinkActive,
  ],
  selector:    "standard--header",
  standalone:  true,
  styleUrls:   [
    "HeaderComponent.sass",
  ],
  templateUrl: "HeaderComponent.html",
})
export class HeaderComponent {

  public readonly subtitle: string = subtitle;
  public readonly title:    string = title;

}
