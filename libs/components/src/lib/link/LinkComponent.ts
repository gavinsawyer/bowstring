import { NgComponentOutlet, NgTemplateOutlet }                             from "@angular/common";
import { Component, inject, Input, numberAttribute, Type, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }                                    from "@angular/router";
import { SymbolContainerDirective }                                        from "@standard/directives";


@Component({
  hostDirectives: [
    {
      directive: SymbolContainerDirective,
      inputs:    [
        "symbol",
      ],
    },
  ],
  imports:        [
    NgComponentOutlet,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  selector:       "standard--link",
  standalone:     true,
  styleUrls:      [
    "LinkComponent.sass",
  ],
  templateUrl:    "LinkComponent.html",
})
export class LinkComponent {

  @Input() public disabled?: boolean;
  @Input() public url?:      string;

  @Input({
    transform: numberAttribute,
  })
  public tabindex?: number;

  @Input({
    required: true,
  })
  public text!: string;

  protected readonly symbolContainerDirective: SymbolContainerDirective = inject<SymbolContainerDirective>(SymbolContainerDirective);

}
