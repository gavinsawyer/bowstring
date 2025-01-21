import { NgTemplateOutlet }                                                                                                          from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, input, type InputSignal, type InputSignalWithTransform, type Signal } from "@angular/core";
import { toObservable, toSignal }                                                                                                    from "@angular/core/rxjs-interop";
import { ContainerDirective, InlinableDirective }                                                                                    from "@standard/directives";
import { type Symbol }                                                                                                               from "@standard/interfaces";
import loadSymbol                                                                                                                    from "@standard/symbols";
import { type SymbolName }                                                                                                           from "@standard/types";
import { type Observable, switchMap }                                                                                                from "rxjs";
import { fromPromise }                                                                                                               from "rxjs/internal/observable/innerFrom";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    host:            {
      "[class.fixedWidth]": "fixedWidthInput$()",
    },
    hostDirectives:  [
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
      {
        directive: InlinableDirective,
        inputs:    [
          "inline",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "standard--symbol",
    styleUrls:       [
      "SymbolComponent.sass",
    ],
    templateUrl:     "SymbolComponent.html",

    standalone: true,
  },
)
export class SymbolComponent {

  public readonly fixedWidthInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }` | undefined> = input<boolean | undefined, "" | boolean | `${ boolean }` | undefined>(
    undefined,
    {
      alias:     "fixedWidth",
      transform: booleanAttribute,
    },
  );
  public readonly input$: InputSignal<SymbolName>                                                                            = input.required<SymbolName>(
    {
      alias: "input",
    },
  );
  public readonly symbolPaths$: Signal<Symbol | undefined>                                                                   = toSignal<Symbol>(
    toObservable<SymbolName>(this.input$).pipe<Symbol>(
      switchMap<SymbolName, Observable<Symbol>>(
        (symbolName: SymbolName): Observable<Symbol> => fromPromise<Symbol>(
          loadSymbol(symbolName),
        ),
      ),
    ),
  );

}
