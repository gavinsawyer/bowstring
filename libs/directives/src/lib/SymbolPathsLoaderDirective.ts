import { Directive, input, InputSignal, Signal } from "@angular/core";
import { toObservable, toSignal }                from "@angular/core/rxjs-interop";
import { SymbolPaths }                           from "@standard/interfaces";
import loadSymbolPaths                           from "@standard/symbol-paths";
import { SymbolName }                            from "@standard/types";
import { filter, Observable, switchMap }         from "rxjs";
import { fromPromise }                           from "rxjs/internal/observable/innerFrom";


@Directive(
  {
    standalone: true,
  },
)
export class SymbolPathsLoaderDirective {

  public readonly symbolNameInput$: InputSignal<SymbolName | undefined> = input<SymbolName | undefined>(
    undefined,
    {
      alias: "symbolName",
    },
  );
  public readonly symbolPaths$: Signal<SymbolPaths | undefined>         = toSignal<SymbolPaths>(
    toObservable<SymbolName | undefined>(
      this.symbolNameInput$,
    ).pipe<SymbolName, SymbolPaths>(
      filter<SymbolName | undefined, SymbolName>(
        (symbolName?: SymbolName): symbolName is SymbolName => !!symbolName,
      ),
      switchMap<SymbolName, Observable<SymbolPaths>>(
        (symbolName: SymbolName): Observable<SymbolPaths> => fromPromise<SymbolPaths>(
          loadSymbolPaths(symbolName),
        ),
      ),
    ),
    {
      initialValue: undefined,
    },
  );

}
