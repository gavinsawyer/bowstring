import { Component, HostBinding, Input, numberAttribute }                                      from "@angular/core";
import { FlexDirection, DistributedAlignment, NormalAlignment, PositionalAlignment, FlexWrap } from "@standard/types";


@Component({
  selector:    "standard--flexbox",
  standalone:  true,
  styleUrls:   [
    "FlexboxComponent.sass",
  ],
  templateUrl: "FlexboxComponent.html",
})
export class FlexboxComponent {

  @HostBinding("style.--standard--flexbox--align-content")   @Input() public alignContent:   DistributedAlignment | NormalAlignment | PositionalAlignment = "normal";
  @HostBinding("style.--standard--flexbox--align-items")     @Input() public alignItems:     DistributedAlignment | NormalAlignment | PositionalAlignment = "normal";
  @HostBinding("style.--standard--flexbox--column-gap")      @Input() public columnGap:      string                                                       = "calc(1rem * pow(var(--phi), 2))" as const;
  @HostBinding("style.--standard--flexbox--flex-basis")      @Input() public flexBasis:      string                                                       = "auto" as const;
  @HostBinding("style.--standard--flexbox--flex-wrap")       @Input() public flexWrap:       FlexWrap                                                     = "nowrap";
  @HostBinding("style.--standard--flexbox--justify-content") @Input() public justifyContent: DistributedAlignment | NormalAlignment | PositionalAlignment = "normal";
  @HostBinding("style.--standard--flexbox--row-gap")         @Input() public rowGap:         string                                                       = "calc(1rem * pow(var(--phi), 1))" as const;

  @HostBinding("style.--standard--flexbox--flex-direction")
  @Input({
    required: true,
  })
  public flexDirection!: FlexDirection;

  @HostBinding("style.--standard--flexbox--flex-grow")
  @Input({
    transform: numberAttribute,
  })
  public flexGrow: number = 0 as const;

  @HostBinding("style.--standard--flexbox--flex-shrink")
  @Input({
    transform: numberAttribute,
  })
  public flexShrink: number = 1 as const;

}
