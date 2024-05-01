import { Component, Input, numberAttribute } from "@angular/core";
import { FlexboxAlignment }                  from "@standard/types";


@Component({
  selector:    "standard--flexbox",
  standalone:  true,
  styleUrls:   [
    "FlexboxComponent.sass",
  ],
  templateUrl: "FlexboxComponent.html",
})
export class FlexboxComponent {

  @Input() public alignContent?:   FlexboxAlignment;
  @Input() public alignItems?:     FlexboxAlignment;
  @Input() public basis?:          string;
  @Input() public justifyContent?: FlexboxAlignment;
  @Input() public reverse?:        boolean;
  @Input() public wrap?:           "nowrap" | "wrap" | "wrap-reverse";

  @Input({
    required: true,
  })
  public direction?: "column" | "row";

  @Input({
    transform: numberAttribute,
  })
  public grow?: number;

  @Input({
    transform: numberAttribute,
  })
  public shrink?: number;

}
