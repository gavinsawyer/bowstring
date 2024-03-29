import { Component, Input }             from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";


@Component({
  imports:     [
    RouterLink,
    RouterLinkActive,
  ],
  selector:    "standard--link",
  standalone:  true,
  styleUrls:   [
    "LinkComponent.sass",
  ],
  templateUrl: "LinkComponent.html",
})
export class LinkComponent {

  @Input({
    required: true,
  })
  public text!: string;

  @Input() public disabled?: boolean;
  @Input() public tabindex?: number;
  @Input() public url?:      string;

}
