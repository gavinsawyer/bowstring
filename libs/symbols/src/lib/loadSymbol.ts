import { type Symbol }     from "@standard/interfaces";
import { type SymbolName } from "@standard/types";


function loadSymbol(symbolName: SymbolName): Promise<Symbol> {
  return import(`./_${ symbolName }`).then<Symbol>(
    (module): Symbol => module[`_${ symbolName }`],
  );
}

export default loadSymbol;
