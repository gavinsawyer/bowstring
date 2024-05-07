import { NgComponentOutlet, NgTemplateOutlet }                         from "@angular/common";
import { booleanAttribute, Component, inject, Input, numberAttribute } from "@angular/core";
import { RouterLink, RouterLinkActive }                                from "@angular/router";
import { SymbolContainerDirective, TranslationHoverDirective } from "@standard/directives";
import { FlexboxChildComponent }                               from "../flexbox child/FlexboxChildComponent";


@Component({
  hostDirectives: [
    {
      directive: SymbolContainerDirective,
      inputs:    [
        "symbol",
      ],
    },
    TranslationHoverDirective,
  ],
  imports:        [
    NgComponentOutlet,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  selector:       "standard--button",
  standalone:     true,
  styleUrls:      [
    "ButtonComponent.sass",
  ],
  templateUrl:    "ButtonComponent.html",
})
export class ButtonComponent extends FlexboxChildComponent {

  @Input() public appearance?: "flat" | "raised" | "symbol";
  @Input() public color?:      "primary" | "none";
  @Input() public text?:       string;
  @Input() public type?:       "button" | "reset" | "submit";
  @Input() public url?:        string;

  @Input({
    transform: booleanAttribute,
  })
  public disabled?: boolean;

  @Input({
    transform: numberAttribute,
  })
  public tabIndexOverride?: number;

  protected readonly symbolContainerDirective:  SymbolContainerDirective  = inject<SymbolContainerDirective>(SymbolContainerDirective);
  protected readonly translationHoverDirective: TranslationHoverDirective = inject<TranslationHoverDirective>(TranslationHoverDirective);

}
