import { Component, HostBinding, Input, numberAttribute } from "@angular/core";


@Component({
  standalone: true,
  template:   "",
})
export class FlexboxChildComponent {

  @HostBinding("style.--standard--flexbox-child--flex-basis") @Input() public flexBasis?: string;

  @HostBinding("style.--standard--flexbox-child--flex-grow")
  @Input({
    transform: numberAttribute,
  })
  public flexGrow?: number;

  @HostBinding("style.--standard--flexbox-child--flex-shrink")
  @Input({
    transform: numberAttribute,
  })
  public flexShrink?: number;

}
