import { NgOptimizedImage }                                                    from "@angular/common";
import { Component, inject, Input, LOCALE_ID, OnInit, signal, WritableSignal } from "@angular/core";
import { SYMBOL_ASPECT_RATIOS }                                                from "@standard/injection-tokens";
import * as symbolAspectRatios                                                 from "@standard/symbol-aspect-ratios";


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
export class SymbolComponent implements OnInit {

  @Input({
    required: true,
  })
  public name!: keyof typeof symbolAspectRatios;

  private readonly symbolAspectRatios: typeof symbolAspectRatios = inject<typeof symbolAspectRatios>(SYMBOL_ASPECT_RATIOS);

  public readonly aspectRatio$: WritableSignal<number | undefined> = signal<number | undefined>(this.symbolAspectRatios[this.name]);
  public readonly localeId:     string                             = inject<string>(LOCALE_ID);

  ngOnInit(): void {
    this
      .aspectRatio$
      .set(this.symbolAspectRatios[this.name])
  }

}
