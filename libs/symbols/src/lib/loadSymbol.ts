import { type Symbol }     from "@bowstring/interfaces";
import { type SymbolName } from "@bowstring/types";


function loadSymbol(symbolName: SymbolName): Promise<Symbol> {
  return import(`./_${ symbolName }`).then<Symbol>(
    (module): Symbol => module[`_${ symbolName }`],
  );
}

export default loadSymbol;
