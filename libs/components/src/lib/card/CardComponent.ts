import { Component, HostBinding, Input } from "@angular/core";
import { FlexboxComponent }              from "../flexbox/FlexboxComponent";


@Component({
  selector:    "standard--card",
  standalone:  true,
  styleUrls:   [
    "CardComponent.sass",
  ],
  templateUrl: "CardComponent.html",
})
export class CardComponent extends FlexboxComponent {

  @HostBinding("style.--standard--flexbox--column-gap") @Input() public override columnGap: string = "calc(1rem * pow(var(--phi), 0))" as const;
  @HostBinding("style.--standard--flexbox--row-gap")    @Input() public override rowGap:    string = "calc(1rem * pow(var(--phi), -1))" as const;

}
