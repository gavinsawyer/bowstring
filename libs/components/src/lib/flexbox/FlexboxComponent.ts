import { Component, Input, numberAttribute }         from "@angular/core";
import { DistributedAlignment, PositionalAlignment } from "@standard/types";


@Component({
  selector:    "standard--flexbox",
  standalone:  true,
  styleUrls:   [
    "FlexboxComponent.sass",
  ],
  templateUrl: "FlexboxComponent.html",
})
export class FlexboxComponent {

  @Input() public alignContent?:   DistributedAlignment | PositionalAlignment;
  @Input() public alignItems?:     DistributedAlignment | PositionalAlignment;
  @Input() public basis?:          string;
  @Input() public justifyContent?: DistributedAlignment | PositionalAlignment;
  @Input() public wrap?:           "nowrap" | "wrap" | "wrap-reverse";

  @Input({
    required: true,
  })
  public direction?: "column" | "column-reverse" | "row" | "row-reverse";

  @Input({
    transform: numberAttribute,
  })
  public grow?: number;

  @Input({
    transform: numberAttribute,
  })
  public shrink?: number;

}
