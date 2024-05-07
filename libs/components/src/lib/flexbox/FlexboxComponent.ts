import { Component, HostBinding, Input }                                                           from "@angular/core";
import { FlexDirection, DistributedAlignment, NormalAlignment, FlexPositionalAlignment, FlexWrap } from "@standard/types";
import { FlexboxChildComponent }                                                                   from "../flexbox child/FlexboxChildComponent";


@Component({
  selector:    "standard--flexbox",
  standalone:  true,
  styleUrls:   [
    "FlexboxComponent.sass",
  ],
  templateUrl: "FlexboxComponent.html",
})
export class FlexboxComponent extends FlexboxChildComponent {

  @HostBinding("style.--standard--flexbox--align-content")   @Input() public alignContent?:   DistributedAlignment | NormalAlignment | FlexPositionalAlignment;
  @HostBinding("style.--standard--flexbox--align-items")     @Input() public alignItems?:     DistributedAlignment | NormalAlignment | FlexPositionalAlignment;
  @HostBinding("style.--standard--flexbox--column-gap")      @Input() public columnGap?:      string;
  @HostBinding("style.--standard--flexbox--flex-wrap")       @Input() public flexWrap?:       FlexWrap;
  @HostBinding("style.--standard--flexbox--gap")             @Input() public gap?:            string;
  @HostBinding("style.--standard--flexbox--justify-content") @Input() public justifyContent?: DistributedAlignment | NormalAlignment | FlexPositionalAlignment;
  @HostBinding("style.--standard--flexbox--row-gap")         @Input() public rowGap?:         string;

  @HostBinding("style.--standard--flexbox--flex-direction")
  @Input({
    required: true,
  })
  public flexDirection!: FlexDirection;

}
