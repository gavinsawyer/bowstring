import { NgComponentOutlet, NgTemplateOutlet }              from "@angular/common";
import { Component, Input, OnInit, signal, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }                     from "@angular/router";
import * as symbolComponents                                from "../symbols";


@Component({
  imports: [
    NgComponentOutlet,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  selector:    "standard--link",
  standalone:  true,
  styleUrls:   [
    "LinkComponent.sass",
  ],
  templateUrl: "LinkComponent.html",
})
export class LinkComponent implements OnInit {

  @Input() public disabled?: boolean;
  @Input() public symbol?:   (keyof typeof symbolComponents) extends `${infer name}SymbolComponent` ? name extends `_${infer unprefixedName}` ? unprefixedName : name : never;
  @Input() public tabindex?: number;
  @Input() public url?:      string;

  @Input({
    required: true,
  })
  public text!: string;

  protected readonly symbolComponent$: WritableSignal<typeof symbolComponents[keyof typeof symbolComponents] | undefined> = signal<typeof symbolComponents[keyof typeof symbolComponents] | undefined>(
    this.symbol && symbolComponents[(Object.prototype.hasOwnProperty.call(symbolComponents, `${this.symbol}SymbolComponent`) ? `${this.symbol}SymbolComponent` : `_${this.symbol}SymbolComponent`) as keyof typeof symbolComponents],
  );

  public ngOnInit(): void {
    this
      .symbolComponent$
      .set(
        this.symbol && symbolComponents[(Object.prototype.hasOwnProperty.call(symbolComponents, `${this.symbol}SymbolComponent`) ? `${this.symbol}SymbolComponent` : `_${this.symbol}SymbolComponent`) as keyof typeof symbolComponents],
      );
  }

}
