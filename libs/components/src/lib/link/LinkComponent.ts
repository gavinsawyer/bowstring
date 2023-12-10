import { NgIf }                         from "@angular/common";
import { Component, Input }             from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";


@Component({
  imports:     [
    NgIf,
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
  }) public label!: string;
  @Input({
    required: true,
  }) public url!: string;

}
