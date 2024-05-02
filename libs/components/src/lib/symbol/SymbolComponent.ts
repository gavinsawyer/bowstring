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

  public async ngOnInit   ():                       Promise<void> {
    this
      .symbol && this
      .symbolComponent$
      .set(
        await symbols[this.symbol](),
      );
  }
  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    Object
      .hasOwnProperty
      .call(changes, "symbol") && changes["symbol"]
      .currentValue && this
      .symbolComponent$
      .set(
        await symbols[changes["symbol"].currentValue as keyof typeof symbols](),
      );
  }

}
