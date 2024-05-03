import { Component, Input, OnChanges, OnInit, signal, SimpleChanges, Type, WritableSignal } from "@angular/core";
import { symbols }                                                                          from "../symbols";


@Component({
  selector:   "standard--symbol",
  standalone: true,
  template:   "",
})
export class SymbolComponent implements OnInit, OnChanges {

  @Input() public symbol?: keyof typeof symbols;

  protected readonly symbolComponent$: WritableSignal<Type<unknown> | undefined> = signal<Type<unknown> | undefined>(undefined);

  public ngOnChanges(changes: SimpleChanges): void {
    Object
      .hasOwnProperty
      .call(changes, "symbol") && changes["symbol"]
      .currentValue && symbols[changes["symbol"].currentValue as keyof typeof symbols]
      .loadComponent()
      .then(
        (symbolComponent: Type<unknown>): void => this.symbolComponent$.set(symbolComponent),
      );
  }
  public ngOnInit   ():                       void {
    this
      .symbol && symbols[this.symbol]
      .loadComponent()
      .then(
        (symbolComponent: Type<unknown>): void => this.symbolComponent$.set(symbolComponent),
      );
  }

}
