import { Component, HostBinding, Input }                                            from "@angular/core";
import { DistributedAlignment, NormalAlignment, FlexWrap, GridPositionalAlignment } from "@standard/types";
import { FlexboxChildComponent }                                                    from "../flexbox child/FlexboxChildComponent";


@Component({
  selector:    "standard--grid",
  standalone:  true,
  styleUrls:   [
    "GridComponent.sass",
  ],
  templateUrl: "GridComponent.html",
})
export class GridComponent extends FlexboxChildComponent {

  @HostBinding("style.--standard--grid--align-content")   @Input() public alignContent?:   DistributedAlignment | GridPositionalAlignment | NormalAlignment;
  @HostBinding("style.--standard--grid--align-items")     @Input() public alignItems?:     DistributedAlignment | GridPositionalAlignment | NormalAlignment;
  @HostBinding("style.--standard--grid--column-gap")      @Input() public columnGap?:      string;
  @HostBinding("style.--standard--grid--flex-wrap")       @Input() public flexWrap?:       FlexWrap;
  @HostBinding("style.--standard--grid--gap")             @Input() public gap?:            string;
  @HostBinding("style.--standard--grid--justify-content") @Input() public justifyContent?: DistributedAlignment | GridPositionalAlignment | NormalAlignment;
  @HostBinding("style.--standard--grid--row-gap")         @Input() public rowGap?:         string;

}
