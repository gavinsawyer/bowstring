import { Component, input, type InputSignal, type Signal } from "@angular/core";
import { toObservable, toSignal }                          from "@angular/core/rxjs-interop";
import { type SymbolPaths }                                from "@standard/interfaces";
import loadSymbolPaths                                     from "@standard/symbol-paths";
import { type SymbolName }                                 from "@standard/types";
import { type Observable, switchMap }                      from "rxjs";
import { fromPromise }                                     from "rxjs/internal/observable/innerFrom";


@Component(
  {
    selector:    "standard--symbol",
    standalone:  true,
    styleUrls:   [
      "SymbolComponent.sass",
    ],
    templateUrl: "SymbolComponent.html",
  },
)
export class SymbolComponent {

  public readonly symbolNameInput$: InputSignal<SymbolName>     = input.required<SymbolName>(
    {
      alias: "symbolName",
    },
  );
  public readonly symbolPaths$: Signal<SymbolPaths | undefined> = toSignal<SymbolPaths | undefined, undefined>(
    toObservable<SymbolName>(
      this.symbolNameInput$,
    ).pipe<SymbolPaths>(
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
