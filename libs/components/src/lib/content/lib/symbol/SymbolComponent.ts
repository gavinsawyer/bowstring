import { NgTemplateOutlet }                                from "@angular/common";
import { Component, input, type InputSignal, type Signal } from "@angular/core";
import { toObservable, toSignal }                          from "@angular/core/rxjs-interop";
import { ContainerDirective }                              from "@standard/directives";
import { type SymbolPaths }                                from "@standard/interfaces";
import loadSymbolPaths                                     from "@standard/symbol-paths";
import { type SymbolName }                                 from "@standard/types";
import { type Observable, switchMap }                      from "rxjs";
import { fromPromise }                                     from "rxjs/internal/observable/innerFrom";


@Component(
  {
    hostDirectives: [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
    ],
    selector:       "standard--symbol",
    standalone:     true,
    styleUrls:      [
      "SymbolComponent.sass",
    ],
    templateUrl:    "SymbolComponent.html",
    imports:        [
      NgTemplateOutlet,
    ],
  },
)
export class SymbolComponent {

  public readonly input$: InputSignal<SymbolName>               = input.required<SymbolName>(
    {
      alias: "input",
    },
  );
  public readonly symbolPaths$: Signal<SymbolPaths | undefined> = toSignal<SymbolPaths>(
    toObservable<SymbolName>(
      this.input$,
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
