import { Directive, Input, OnChanges, OnInit, signal, SimpleChanges, Type, WritableSignal } from "@angular/core";
import { symbolComponents }                                                                 from "@standard/symbol-components";


@Directive({
  standalone: true,
})
export class SymbolContainerDirective implements OnInit, OnChanges {

  @Input() public symbol?: keyof typeof symbolComponents;

  public readonly symbolComponent$: WritableSignal<Type<unknown> | undefined> = signal<Type<unknown> | undefined>(undefined);

  public ngOnChanges(changes: SimpleChanges): void {
    Object
      .hasOwnProperty
      .call(changes, "symbol") && changes["symbol"]
      .currentValue && symbolComponents[changes["symbol"].currentValue as keyof typeof symbolComponents]
      .loadComponent()
      .then(
        (symbolComponent: Type<unknown>): void => this.symbolComponent$.set(symbolComponent),
      );
  }
  public ngOnInit   ():                       void {
    this
      .symbol && symbolComponents[this.symbol]
      .loadComponent()
      .then(
        (symbolComponent: Type<unknown>): void => this.symbolComponent$.set(symbolComponent),
      );
  }

}
