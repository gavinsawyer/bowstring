import { NgOptimizedImage }                    from "@angular/common";
import { Component, inject, Input, LOCALE_ID } from "@angular/core";
import { SYMBOLS }                             from "@standard/injection-tokens";
import { Symbols }                             from "@standard/interfaces";


@Component({
  imports:     [
    NgOptimizedImage,
  ],
  selector:    "standard--symbol",
  standalone:  true,
  styleUrls:   [
    "SymbolComponent.sass",
  ],
  templateUrl: "SymbolComponent.html",
})
export class SymbolComponent {

  private readonly symbols: Symbols = inject<Symbols>(SYMBOLS);

  @Input({
    required: true,
  })
  public name!: string;

  public readonly height:   string = this.symbols[this.name]?.height;
  public readonly localeId: string = inject<string>(LOCALE_ID);
  public readonly width:    string = this.symbols[this.name]?.width;


}
