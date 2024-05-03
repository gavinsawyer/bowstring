import { NgComponentOutlet, NgTemplateOutlet } from "@angular/common";
import { Component, Input, numberAttribute }   from "@angular/core";
import { RouterLink, RouterLinkActive }        from "@angular/router";
import { SymbolComponent }                     from "../symbol/SymbolComponent";


@Component({
  imports:     [
    NgComponentOutlet,
    NgTemplateOutlet,
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
export class LinkComponent extends SymbolComponent {

  @Input() public disabled?: boolean;
  @Input() public url?:      string;

  @Input({
    transform: numberAttribute,
  }) public tabindex?: number;

  @Input({
    required: true,
  })
  public text!: string;

}
