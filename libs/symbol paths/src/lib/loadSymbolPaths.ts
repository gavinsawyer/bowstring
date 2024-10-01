import { type SymbolPaths } from "@standard/interfaces";
import { type SymbolName }  from "@standard/types";


function loadSymbolPaths(symbolName: SymbolName): Promise<SymbolPaths> {
  return import(`./_${ symbolName }`).then<SymbolPaths>(
    (module): SymbolPaths => module[`_${ symbolName }`],
  );
}

export default loadSymbolPaths;
